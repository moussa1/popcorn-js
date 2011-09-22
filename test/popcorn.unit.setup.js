if ( !window[ "console" ] ) {
  jQuery.getScript( "https://getfirebug.com/firebug-lite-debug.js" );
}

(function( global ) {

  var Setup = {};

  Setup.eventset = "loadstart progress suspend emptied stalled play pause " +
                   "loadedmetadata loadeddata waiting playing canplay canplaythrough " +
                   "seeking seeked timeupdate ended ratechange durationchange volumechange";

  Setup.events = Setup.eventset.split(/\s+/g);

  global.Setup = Setup;

})( window );
