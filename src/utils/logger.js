"use strict";

var Logger = function( level ) {
  this.level = level;
};

Logger.VERBOSE = 0;
Logger.DEBUG = 1;
Logger.INFO = 2;
Logger.WARNING = 3;
Logger.ERROR = 4;

Logger.prototype.verbose = function() {
  if ( this.level <= Logger.VERBOSE ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.debug = function() {
  if ( this.level <= Logger.DEBUG ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.info = function() {
  if ( this.level <= Logger.INFO ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.warn = function() {
  if ( this.level <= Logger.WARNING ) {
    console.log.apply( console, arguments );
  }
};

Logger.prototype.error = function() {
  if ( this.level <= Logger.ERROR ) {
    console.log.apply( console, arguments );
  }
};

module.exports = new Logger( Logger[ process.argv[ 5 ] ] );
