"use strict";

var MahjongMan = {
  init: function( options ) {
    this.id = options.game.id;
    this.Pais = options.kyoku.tehais[ this.id ];
  },
  calc: function( event ) {
    var act;
    switch ( event.type ) {
      case "tsumo":
        act = this._tsumo( event );
        break;
      case "dahai":
        act = this._dahai( event );
        break;
      case "pon":
      case "hora":
      case "reach":
      case "reach_accepted":
      case "chi":
      case "ankan":
      case "kakan":
      case "daiminkai":
      case "dora":
      default:
        break;
    }
    return;
  },
  _tsumo: function( event ) {
    if ( event.actor !== this.id ) {
      return;
    }
    for ( var i in event.possible_actions ) {
      switch ( event.possible_actions[ i ].type ) {
        case "ankan":
        case "kakan":
          return event.possible_actions[ i ];
        case "reach":
          this._reach( event.possible_actions[ i ] );
        default:
          break;
      }
    }
  },
  _calc: function( tsumo ) {

  },
  _reach: function( action ) {

  },
  _dahai: function( event ) {
    for ( var i in event.possible_actions ) {
      switch ( event.possible_actions[ i ].type ) {
        case "daiminkai":
        case "kakan":
          return event.possible_actions[ i ];
        default:
          break;
      }
    }
  }
};

module.exports = MahjongMan;
