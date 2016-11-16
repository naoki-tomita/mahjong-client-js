module.exports = {
  using: function( arr, fn ) {
    for ( var i in arr ) {
      fn( arr[ i ] );
    }
  }
};
