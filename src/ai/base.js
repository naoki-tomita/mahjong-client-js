"use strict";
var _ = require( "../utils/_" ),
    logger = require( "../utils/logger" );

var MahjongMan = {
  init: function( options ) {
    this.id = options.game.id;
    this.pais = options.kyoku.tehais[ this.id ];
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
      case "reach":
        if ( event.actor === this.id ) {
          act = this._tsumo( event );
        }
        break;
      case "reach_accepted":
      case "pon":
      case "chi":
      case "ankan":
      case "kakan":
      case "daiminkai":
      case "dora":
      default:
        break;
    }
    if ( act ) {
      logger.info( event );
      logger.info( "     ->", act );
      logger.info( "       ", JSON.stringify( _.sortPais( this.pais ) ) );
    }
    return act;
  },
  _putForReach: function( event ) {
    return this.putForReach( event );
  },
  _tsumo: function( event ) {
    var put;
    if ( event.actor !== this.id ) {
      return;
    }
    for ( var i in event.possible_actions ) {
      switch ( event.possible_actions[ i ].type ) {
        case "ankan":
        case "kakan":
          return event.possible_actions[ i ];
        case "reach":
          return this._reach( event.possible_actions[ i ] );
        case "hora":
          return this._hora( event.possible_actions[ i ] );
        default:
          break;
      }
    }
    this._add( event.pai );
    put = this.calculate( event );
    this._pull( put.pai );
    return put;
  },
  _add: function( pai ) {
    this.pais.push( pai );
  },
  _pull: function( pai ) {
    this.pais = _.pullArray( this.pais, _.getPaiIndex( this.pais, pai ) );
  },
  _hora: function( action ) {
    return this.hora( action );
  },
  _reach: function( action ) {
    return this.reach( action );
  },
  _dahai: function( event ) {
    for ( var i in event.possible_actions ) {
      switch ( event.possible_actions[ i ].type ) {
        case "daiminkai":
        case "kakan":
          return event.possible_actions[ i ];
        case "hora":
          return this._hora( event.possible_actions[ i ] );
        default:
          break;
      }
    }
  }
};

module.exports = MahjongMan;
