"use strict";

var Logger = function( level ) {
  this.level = level;
};

Logger.prototype.VERBOSE = 0;
Logger.prototype.DEBUG = 1;
Logger.prototype.INFO = 2;
Logger.prototype.WARNING = 3;
Logger.prototype.ERROR = 4;

Logger.prototype.verbose = function() {
  if ( this.level >== Logger.VERBOSE ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.debug = function() {
  if ( this.level >== Logger.DEBUG ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.info = function() {
  if ( this.level >== Logger.INFO ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.warn = function() {
  if ( this.level >== Logger.WARNING ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.error = function() {
  if ( this.level >== Logger.ERROR ) {
    console.log.apply( console, arguments );
  }
};

module.exports = Logger;
