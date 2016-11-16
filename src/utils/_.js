"use strict"
var _;

module.exports = _ = {
  KAZE: [ "E", "S", "W", "N", "P", "F", "C" ],
  createPaiNums: function( pais ) {
    var hash = {};
    for ( var i = 0; i <= 9; i++ ) {
      hash[ i + "m" ] = this.countPai( pais, i + "m" );
      hash[ i + "p" ] = this.countPai( pais, i + "p" );
      hash[ i + "s" ] = this.countPai( pais, i + "s" );
    }
    for ( var i in this.KAZE ) {
      hash[ this.KAZE[ i ] ] = this.countPai( pais, this.KAZE[ i ] );
    }
    return hash;
  },
  countPai: function( pais, pai ) {
    var count = 0;
    for ( var i in pais ) {
      if ( pais[ i ].indexOf( pai ) ) {
        count++;
      }
    }
    return count;
  },
  sortPais: function( pais ) {
    pais.sort( function( a, b ) {
      _.converTotId( a ) - _.converTotId( b );
    } );
  },
  converTotId: function( pai ) {
    if ( pai.length === 1 ) {
      // 字牌
      return 40 + _.KAZE.indexOf( pai );
    } else if ( pai[1] === "m" ) {
      return 10 + parseInt( pai[0], 10 );
    } else if ( pai[1] === "p" ) {
      return 20 + parseInt( pai[0], 10 );
    } else {
      return 30 + parseInt( pai[0], 10 );
    }
  },
  convertToPai: function( number ) {
    if ( 40 <= number ) {
      return _.KAZE[ number - 40 ];
    } else if ( 30 <= number ) {
      return ( number - 30 ) + "s";
    } else if ( 20 <= number ) {
      return ( number - 20 ) + "p";
    } else {
      return ( number - 20 ) + "m";
    }
  }
};
