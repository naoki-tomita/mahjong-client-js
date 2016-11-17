"use strict"
var _;

module.exports = _ = {
  KAZE: [ "E", "S", "W", "N", "P", "F", "C" ],
  createPaiNums: function( pais ) {
    var hash = {};
    for ( var i = 1; i <= 9; i++ ) {
      hash[ i + "m" ] = _.countPai( pais, i + "m" );
      hash[ i + "p" ] = _.countPai( pais, i + "p" );
      hash[ i + "s" ] = _.countPai( pais, i + "s" );
    }
    for ( var i in _.KAZE ) {
      hash[ _.KAZE[ i ] ] = _.countPai( pais, _.KAZE[ i ] );
    }
    return hash;
  },
  countPai: function( pais, pai ) {
    var count = 0;
    for ( var i in pais ) {
      if ( pais[ i ].indexOf( pai ) === 0 ) {
        count++;
      }
    }
    return count;
  },
  sortPais: function( pais ) {
    pais.sort( function( a, b ) {
      return _.converTotId( a ) - _.converTotId( b );
    } );
    return pais;
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
      return ( number - 10 ) + "m";
    }
  },
  extend: function( base, ex ) {
    for ( var k in ex ) {
      base[ k ] = ex[ k ];
    }
    return base;
  },
  pullArray: function( array, index ) {
    array.splice( index, 1 );
    return array;
  },
  exclusionPais: function( pais, pai ) {
    for ( var i = pais.length - 1; i >= 0; i-- ) {
      if ( _.is( pais[ i ], pai ) ) {
        pais = _.pullArray( pais, i );
      }
    }
    return pais;
  },
  getPaiIndex: function( pais, pai ) {
    for ( var i in pais ) {
      if ( _.is( pais[ i ], pai ) ) {
        return i;
      }
    }
  },
  is: function( a, b ) {
    return a.indexOf( b ) === 0;
  },
  isRed: function( pais, pai ) {
    var i;
    if ( pais.length === 0 ) {
      return false;
    }
    if ( pai[ 0 ] !== "5" ) {
      return false;
    }
    i = _.getPaiIndex( pais, pai );
    if ( pais[ i ].length === 3 ) {
      return true;
    }
    return false;
  }
};
