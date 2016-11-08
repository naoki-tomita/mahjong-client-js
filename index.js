var url = require( "url" ),
    MahjongClient = require( "./MJSONPWebSocketClient.js" ),
    ai, path, name;

path = url.parse( process.argv[ 2 ] );
name = process.argv[ 3 ];
ai = require( process.argv[ 4 ] ? process.argv[ 4 ] : "./TsumogiriMan.js" );

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
      that.ai.initialize( {
        game: that.game,
        kyoku: mjson
      } );
      that.client.none();
    } );
    this.client.on( "tsumo", function( mjson ) {
      var turn = that.ai.calc( mjson );
      if ( turn ) {
        that.client.send( turn );
        return;
      }
      that.client.none();
    } );
    this.client.on( "event", function( mjson ) {
      var turn = that.ai.check( mjson );
      if ( turn ) {
        that.client.send( turn );
        return;
      }
      that.client.none();
    } )
  }
};

MahjongClient.initialize( path, name );
MahjongApp.initialize( MahjongClient, ai );
