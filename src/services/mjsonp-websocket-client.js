"use strict";

var WebSocket = require( "websocket" ),
    EventHandler = require( "../utils/event-handler" ),
    logger = require( "../utils/logger" ),
    MahjongClient;

MahjongClient = {
  init: function( path, name ) {
    this.path = path;
    this.name = name;
    this.initializeHandler();
    this.initializeSocket();
  },
  initializeHandler: function() {
    this.handler = new EventHandler();
  },
  initializeSocket: function() {
    var that = this, socket;
    socket = new WebSocket.client();
    socket.on( "connectFailed", function( error ) {
      logger.error( error );
    } );
    socket.on( "connect", function( connection ) {
      logger.info( "connected to ", that.path );
      that.connection = connection;
      that.initializeConnectionEvents();
    } );
    socket.connect( this.path.href, "" );
  },
  initializeConnectionEvents: function() {
    var that = this;
    this.connection.on( "error", function( error ) {
      logger.error( error );
    } );
    this.connection.on( "close", function() {
      logger.info( "connection closed" );
      that.closed = true;
    } );
    this.connection.on( "message", function( data ) {
      var mjson;
      if ( data.type !== "utf8" ) {
        return;
      }
      try {
        mjson = JSON.parse( data.utf8Data );
      } catch ( e ) {
        return;
      }
      logger.verbose( "<- ", mjson );
      switch ( mjson.type ) {
        // event you want to handle, add case.
        case "hello" :
          that.join();
          break;

        case "start_game":
          that.trigger( "start_game", mjson );
          break;

        case "start_kyoku":
          that.trigger( "start_kyoku", mjson );
          break;

        case "end_game":
          logger.info( mjson );
          that.trigger( "end_game", mjson );
          break;

        case "error":
          logger.error( mjson );
          that.trigger( "error", mjson );
          break;

        default:
          that.trigger( "event", mjson );
          break;
      }
    } );
  },
  join: function() {
    this.send( {
      type: "join",
      name: this.name,
      room: this.path.pathname.substr( 1, this.path.pathname.length )
    } );
  },
  none: function() {
    this.send( {
      type: "none"
    } );
  },
  send: function( mjson ) {
    if ( this.closed || !this.connection ) {
      return;
    }
    logger.verbose( "-> ", mjson );
    this.connection.sendUTF( JSON.stringify( mjson ) + "\n" );
  },
  on: function( event, callback ) {
    this.handler.on( event, callback );
  },
  trigger: function( event, args ) {
    this.handler.trigger( event, args );
  }
};

module.exports = MahjongClient;
