var net = require( "net" ),
    EventHandler = require( "./EventHandler.js" );

var MahjongClient = {
  initialize: function( path, name ) {
    this.path = path;
    this.name = name;
    this.initializeHandler();
    this.initializeSocket();
  },
  initializeHandler: function() {
    this.handler = new EventHandler();
  },
  initializeSocket: function() {
    var that = this;
    this.socket = new net.Socket();
    this.socket.connect( this.path.port, this.path.hostname, function() {
      console.log( "connected to", this.path );
    } );
    this.socket.on( "data", function( data ) {
      var mjson = data.toString( "utf-8" );
      try {
        mjson = JSON.parse( mjson );
      } catch ( e ) {
        return;
      }
      console.log( "<- ", mjson );
      switch ( mjson.type ) {
        case "hello" :
          that.join();
          break;

        case "start_game":
          that.trigger( "start_game", mjson );
          break;

        case "start_kyoku":
          that.trigger( "start_kyoku", mjson );
          break;

        case "tsumo":
          that.trigger( "tsumo", mjson );
          break;

        default:
          that.trigger( "event", mjson );
          break;
      }
    } );
    this.socket.on( "close", function() {
      console.log( "closed" );
      this.closed = true;
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
    if ( this.closed ) {
      return;
    }
    console.log( "-> ", mjson );
    this.socket.write( JSON.stringify( mjson ) + "\n" );
  },
  on: function( event, callback ) {
    this.handler.on( event, callback );
  },
  trigger: function( event, args ) {
    this.handler.trigger( event, args );
  }
};

module.exports = MahjongClient;
