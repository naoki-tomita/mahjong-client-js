var _ = require( "../../src/utils/_" ),
    chai = require( "chai" ),
    helper = require( "../helpers/helper" );

global.assert = chai.assert;

describe( "underscore", function() {
  describe( "convertTo", function() {
    var tests = [ "1m", "5m", "9m", "3p", "4s", "N", "E", "C" ];
    before( function() {
    } );
    helper.using( tests, function( test ) {
      it( test + " convertToPai -> converTotId", function() {
        assert.equal( test, _.convertToPai( _.converTotId( test ) ) );
      } );
    } );
  } );
  describe( "sortPais", function() {
    var test = [ "3m", "N", "5s", "C", "7p", "E" ];
    it( "should see sorted", function() {
      assert.deepEqual( _.sortPais( test ), [ "3m", "7p", "5s", "E", "N", "C" ] );
    } );
  } );
} );
