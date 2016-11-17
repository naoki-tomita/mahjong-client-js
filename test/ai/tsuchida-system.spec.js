var ai = require( "../../src/ai/tsuchida-system" ),
    _ = require( "../../src/utils/_" ),
    chai = require( "chai" ),
    helper = require( "../helpers/helper.js" );

global.assert = chai.assert;

describe( "ai", function() {
  var tests = [
    { tsumo: "1m", dahai: "2m" },
    { tsumo: "1m", dahai: "1m" },
    { tsumo: "4m", dahai: "3m" },
    { tsumo: "6m", dahai: "7m" },
    { tsumo: "9m", dahai: "8m" },
    { tsumo: "8p", dahai: "8p" },
    { tsumo: "9p", dahai: "7m" },
  ];
  before( function() {
    ai.init( {
      game: { id: 0 },
      kyoku: {
        tehais: [
          [ "1m", "2m", "3m", "4m", "5m", "5m", "6m", "7m", "8m", "9m", "9p", "8p", "8p" ]
        ]
      }
    } );
  } );
  helper.using( tests, function( test ) {
    it( JSON.stringify( test ), function() {
      var put;
      put = ai.calc( {
        type: "tsumo",
        pai: test.tsumo,
        actor: 0
      } );
      displayHashPais( _.createPaiNums( ai.pais ) );
      assert.equal( put.pai, test.dahai );
    } );
  } );
} );

function displayHashPais( pais ) {
  for ( var k in pais ) {
    if ( pais[ k ] === 0 ) {
      delete pais[ k ];
    }
  }
  console.log( JSON.stringify( pais ) );
};
