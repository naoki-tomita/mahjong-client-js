var Base = require( "./base" ),
    _ = require( "../utils/_" ),
    logger = require( "../utils/logger" ),
    MahjongMan;

MahjongMan = _.extend( Base, {
  calculate: function( tsumo ) {
    var hash = _.createPaiNums( this.pais ), put;
    // ふたつ揃ったやつは全部無視する。
    for ( var k in hash ) {
      if ( hash[ k ] === 2 ) {
        this.pais = _.exclusionPais( this.pais, k );
      }
    }
    put = this._calcUnnecessaryPai();
    if ( _.isRed( this.pais, put ) ) {
      put = put + "r";
    }
    return {
      type: "dahai",
      actor: this.id,
      tsumogiri: tsumo.pai === put,
      pai: put
    };
  },
  reach: function( action ) {
    return action;
  },
  hora: function( action ) {
    return action;
  },
  putForReach: function() {
    return this.calculate( { pai: undefined } );
  },
  _calcUnnecessaryPai: function() {
    var hash = _.createPaiNums( this.pais );
    for ( var k in hash ) {
      switch ( hash[ k ] ) {
        case 3:
          return k;
        case 1:
          return k;
        default:
          break;
      }
    }
  }
} );

module.exports = MahjongMan;
