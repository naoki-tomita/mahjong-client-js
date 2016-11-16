var ponta = require( "../src/utils/_" ),
    chai = require( "chai" ),
    helper = require( "../helpers/helper" );

global.assert = chai.assert;

describe( "underscore", function() {
  var tests [ "1m", "3p", "4s", "N" ];
  before( function() {
  } );
  helper.using( tests, function( test ) {
    it( test + " convertToPai -> converTotId", function() {
      assert.equal( test, _.convertToPai( _.converTotId( test ) ) );
    } );
  } );
} );
