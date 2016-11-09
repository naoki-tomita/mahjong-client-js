var WebSocket = require( "websocket" ),
    EventHandler = require( "./event-handler" ),
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
      console.error( error );
    } );
    socket.on( "connect", function( connection ) {
      console.log( "connected to ", that.path );
      that.connection = connection;
      that.initializeConnectionEvents();
    } );
    socket.connect( this.path.href, "" );
  },
  initializeConnectionEvents: function() {
    var that = this;
    this.connection.on( "error", function( error ) {
      console.error( error );
    } );
    this.connection.on( "close", function() {
      console.log( "connection closed" );
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
      console.log( "<- ", mjson );
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
    console.log( "-> ", mjson );
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
