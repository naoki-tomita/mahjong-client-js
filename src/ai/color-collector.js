"use strict";

var MahjongMan = {
  init: function( options ) {
    this.id = options.game.id;
    this.pais = options.kyoku.tehais[ this.id ];
    this.color = this._maxColor();
  },
  calc: function( event ) {
    switch ( event.type ) {
      case "tsumo":
        return this._tsumo( event );
      default:
        return;
    }
    return;
  },
  _maxColor: function() {
    var m = 0, p = 0, s = 0;
    for ( var i in this.pais ) {
      if ( this.pais[ i ].indexOf( "m" ) ) {
        m++;
      } else if ( this.pais[ i ].indexOf( "p" ) ) {
        p++;
      } else if ( this.pais[ i ].indexOf( "s" ) ) {
        s++;
      }
    }
    if ( m < p ) {
      if ( p < s ) {
        return "s";
      }
      return "p";
    } else {
      if ( m < s ) {
        return "s";
      }
      return "m";
    }
  },
  _tsumo: function( draw ) {
    var putPai;
    if ( draw.actor !== this.id ) {
      return;
    }
    for ( var i in draw.possible_actions ) {
      if ( draw.possible_actions[ i ].type === "hora" ) {
        return draw.possible_actions[ i ];
      }
    }
    return this._getPutPai( draw );
  },
  _isNeededColor: function( pai ) {
    if ( this._isWind( pai ) ) {
      return true;
    }
    return ( pai.indexOf( this.color ) !== -1 );
  },
  _getUnneededPaiIndex: function() {
    for ( var i in this.pais ) {
      if ( !this._isNeededColor( this.pais[ i ] ) ) {
        return i;
      }
    }
  },
  _isWind: function( pai ) {
    return pai.indexOf( pai.toUpperCase() ) !== -1;
  },
  _getPutPai: function( draw ) {
    var putPai;
    // 狙っている色と同じ色の牌をツモったら、それ以外の色を捨てる。
    if ( this._isNeededColor( draw.pai ) ) {
      putPai = this.pais.splice( this._getUnneededPaiIndex(), 1, draw.pai );
      if ( putPai ) {
        return {
          type: "dahai",
          actor: this.id,
          pai: putPai[ 0 ],
          tsumogiri: false
        };
      }
    }
    return {
      type: "dahai",
      actor: this.id,
      pai: draw.pai,
      tsumogiri: true
    };
  }
};

module.exports = MahjongMan;
