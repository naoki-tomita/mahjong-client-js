var MahjongMan = {
  init: function( options ) {
    this.id = options.game.id;
    this.Pais = options.kyoku.tehais[ this.id ];
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
  _tsumo: function( draw ) {
    if ( draw.actor !== this.id ) {
      return;
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
