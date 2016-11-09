"use strict";

var Class = {
  extend: function( object ) {
    var that = this;
    return function() {
      if ( object.init && typeof object.init === "function" ) {
        object.init.apply( this, arguments );
      }
      this.extend = that.extend;
      this._super = that._super;
    }
  }
};

module.export = Class;
