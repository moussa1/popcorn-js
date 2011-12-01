test("Popcorn Caption Plugin", function () {

  var popped = Popcorn( "#video" ),
      popped2 = Popcorn( "#video2" ),
      expects = 6,
      count = 0,
	  posx,
	  posy,
      captiondiv,
      caption2div;

  expect(expects);

  function plus() {
    if ( ++count === expects ) {
      start();
    }
  }

  stop( 12000 );
  
  ok ( 'caption' in popped, "caption is a method of the popped instance" );
  plus();

  popped.caption({
      start: 0,
      end: 2,
      text: 'this is the first caption of 2011',
	  color: 'red',
	  size: 10,
	  posx: 50,
      posy: 30
    } )
  .caption({
      start: 2,
      end: 4,
      text: 'this is the second caption of 2011',
	  color: 'white',
	  size: 15,
	  posx: 100,
      posy: 50
    } )
	.volume( 0 )
    .play();

  captiondiv = popped.getTrackEvent( popped.getLastTrackEventId() ).container;

  popped.caption({
    start: 7,
    end: 9,
    text: 'instance one test',
	color: 'green',
	size: 10,
	posx: 100,
    posy: 50
  });

  popped2.caption({
      start: 7,
      end: 9,
      text: 'instance two test',
	  color: 'blue',
	  size: 15,
	  posx: 20,
      posy: 20
    })
    .volume( 0 )
    .play().pause();

  caption2div = popped2.getTrackEvent( popped2.getLastTrackEventId() ).container;

  popped.exec( 1, function() {

    popped.media.pause();
    equals( captiondiv.children[ 0 ].innerHTML, "this is the first caption of 2011", "caption displaying correct information" );
    plus();

	ok( captiondiv.children[ 0 ].style.top === "30px", "posy for caption 1 is correct" );
	plus();

    popped.media.play();

  });

  popped.exec( 4, function() {

    popped.media.pause();
    equals (captiondiv.children[ 1 ].innerHTML, "", "caption is clear" );
    plus();

    popped.media.play();

  });

  popped.exec( 8, function() {
    popped.pause();
    popped2.currentTime( 8 ).play();
  });

  popped2.exec( 8, function() {

    popped2.pause();

	//let's test to see if the posx for caption 4 for the second video is correct
    ok( caption2div.children[ 0 ].style.left === "20px", "posx for caption 4 is correct" );
    plus();

	popped.media.play();

  });

  popped.exec( 10, function() {

	//let's test to see if the all the caption divs disappeared at 10 seconds for video 1
	//the last caption for video 1 should end at 9 seconds
    ok( document.getElementById( "caption-0" ).style.display === "none" &&
        document.getElementById( "caption-1" ).style.display === "none" &&
        document.getElementById( "caption-2" ).style.display === "none", "All captions are no longer visible" );
    plus();

  });
});