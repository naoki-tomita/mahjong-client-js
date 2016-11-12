"use strict";

var EventHandler = function() {
  this.on = function( event, callback ) {
    this[ event ] = this[ event ] || [];
    this[ event ].push( callback );
  };

  this.trigger = function( event, args ) {
    var i;
    if ( this[ event ] ) {
      for ( i in this[ event ] ) {
        this[ event ][ i ]( args );
      }
    }
  };
};

module.exports = EventHandler;
