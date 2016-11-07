var MahjongMan = {
  initialize: function( options ) {
    this.id = options.game.id;
    this.Pais = options.kyoku.tehais[ this.id ];
  },
  calc: function( draw ) {
    if ( draw.actor !== this.id ) {
      return;
    }
    return {
      type: "dahai",
      actor: this.id,
      pai: draw.pai,
      tsumogiri: true
    };
  },
  check: function( put ) {
    return;
  }
};

module.exports = MahjongMan;
