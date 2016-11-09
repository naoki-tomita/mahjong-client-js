var url = require( "url" ),
    MahjongClient,
    ai, path, name;

path = url.parse( process.argv[ 2 ] );
name = process.argv[ 3 ];
ai = require( process.argv[ 4 ] ? "./" + process.argv[ 4 ] : "./draw-thrower" );

switch( path.protocol ) {
  case "ws:":
    MahjongClient = require( "./mjsonp-websocket-client" );
    break;
  case "mjsonp:":
    MahjongClient = require( "./mjsonp-client" );
    break;
}

var MahjongApp = {
  initialize: function( client, ai ) {
    this.client = client;
    this.ai = ai;
    this.initializeEvents();
  },
  initializeEvents: function() {
    var that = this;
    this.client.on( "start_game", function( mjson ) {
      if ( !mjson ) {
        return;
      }
      that.game = mjson;
      that.client.none();
    } );
    this.client.on( "start_kyoku", function( mjson ) {
      if ( !mjson ) {
        return;
      }
      that.ai.init( {
        game: that.game,
        kyoku: mjson
      } );
      that.client.none();
    } );
    this.client.on( "event", function( mjson ) {
      var turn = that.ai.calc( mjson );
      if ( turn ) {
        that.client.send( turn );
        return;
      }
      that.client.none();
    } )
  }
};

MahjongClient.init( path, name );
MahjongApp.initialize( MahjongClient, ai );
