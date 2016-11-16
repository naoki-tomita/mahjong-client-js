"use strict";
var KAZE = [ "E", "S", "W", "N", "P", "F", "C" ];
var logger = require( "../utils/logger" );

var MahjongMan = {
  init: function( options ) {
    this.id = options.game.id;
    this.pais = options.kyoku.tehais[ this.id ];
  },
  _hashPais: function() {
    var hashPais = {};
    for ( var i = 0; i < 10; i++ ) {
      hashPais[ i + "m" ] = this._countPai( i + "m" );
      hashPais[ i + "p" ] = this._countPai( i + "p" );
      hashPais[ i + "s" ] = this._countPai( i + "s" );
    }
    for ( var i in KAZE ) {
      hashPais[ KAZE[ i ] ] = this._countPai( KAZE[ i ] );
    }
    return hashPais;
  },
  _countPai: function( pai ) {
    var count = 0;
    for ( var i in this.pais ) {
      if ( this.pais[ i ].indexOf( pai ) === 0 ) {
        count++;
      }
    }
    return count;
  },
  calc: function( event ) {
    var act;
    logger.verbose( "calc", event );
    switch ( event.type ) {
      case "tsumo":
        act = this._tsumo( event );
        break;
      case "dahai":
        act = this._dahai( event );
        break;
      case "pon":
        act = this._tsumo( event );
        break;
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
    if ( act ) {
      logger.info( event )
      logger.info( "      ->", act );
    }
    return act;
  },
  _dahai: function( event ) {
    var act;
    logger.debug( "_dahai", event );
    for ( var i in event.possible_actions ) {
      switch ( event.possible_actions[ i ].type ) {
        case "hora":
          logger.error( "hora!!!!!!!", event.possible_actions[ i ] );
          return event.possible_actions[ i ];
        case "pon":
          logger.error( "pon!!!!!!!", event.possible_actions[ i ] );
          act = this._pon( event.possible_actions[ i ] );
          break;
        case "daiminkai":
          // logger.error( "kan!!!!!!!", event.possible_actions[ i ] );
          // act = this._daiminkan( event.possible_actions[ i ] );
          break;
        case "chi":
        default:
          break;
      }
      if ( act ) {
        return act;
      }
    }
  },
  _tsumo: function( event ) {
    var putPai, tsumogiri = false;
    logger.debug( "_tsumo", event );
    if ( event.actor !== this.id ) {
      return;
    }
    for ( var i in event.possible_actions ) {
      switch ( event.possible_actions[ i ].type ) {
        case "ankan":
          // return event.possible_actions[ i ];
          break;
        case "hora":
          return event.possible_actions[ i ];
        default:
          break;
      }
    }

    this.pais.push( event.pai );
    this._collectToitz();
    putPai = this._calcPutpai();
    tsumogiri = event.pai === putPai;
    return {
      type: "dahai",
      actor: this.id,
      pai: putPai,
      tsumogiri: tsumogiri
    };
  },
  _pon: function( possible_action ) {
    var hashPais = this._hashPais();
    logger.debug( "_pon", possible_action );
    // 既に同じのを三枚持っている場合はポンしてはいけない
    if ( hashPais[ possible_action.pai ] >= 3 ) {
      return;
    }
    return possible_action;
  },
  _daiminkan: function( possible_action ) {
    // とりあえずカンする
    return possible_action;
  },
  _hasPossibleActions: function( event, type ) {
    logger.debug( "_hasPossibleActions", event, type );
    for ( var i in event.possible_actions ) {
      if ( event.possible_actions[ i ].actor === this.id &&
           event.possible_actions[ i ].type === type ) {
        return event.possible_actions[ i ];
      }
    }
    return;
  },
  _calcPutpai: function() {
    var p4 = [], p3 = [], p2 = [], p1 = [], putPai, hashPais = this._hashPais();
    logger.debug( "_calcPutpai" );
    for ( var k in hashPais ) {
      switch( hashPais[ k ] ) {
        case 4:
          p4.push( k );
          break;
        case 3:
          p3.push( k );
          break;
        case 2:
          p2.push( k );
          break;
        case 1:
          p1.push( k );
          break;
      }
    }
    logger.debug( this.pais );
    logger.info( p1, p2, p3, p4 );
    if ( p1.length > 0 ) {
      putPai = p1[ 0 ];
      logger.info( "p1" );
    } else if ( p2.length > 0 ) {
      putPai = p2[ 0 ];
      logger.info( "p2" );
    } else if ( p3.length > 0 ) {
      putPai = p3[ 0 ];
      logger.info( "p3" );
    }

    return this._getPutPai( putPai );
  },
  _getPutPai: function( pai ) {
    for( var i in this.pais ) {
      if ( this.pais[ i ].indexOf( pai ) === 0 ) {
        return this.pais.splice( i, 1 )[ 0 ];
      }
    }
  },
  _collectToitz: function() {
    var hashPais = this._hashPais();
    for ( var k in hashPais ) {
      if ( hashPais[ k ] === 3 ) {
        for ( var i in this.pais ) {
          if ( this.pais[ i ].indexOf( k ) === 0 ) {
            logger.error( "deleted", this.pais.splice( i, 1 ) );
          }
        }
      }
    }
  }
};

module.exports = MahjongMan;
