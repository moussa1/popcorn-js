// PLUGIN: Caption

(function ( Popcorn ) {

  var i = 0,
      createDefaultContainer = function( context ) {

        var ctxContainer = context.container = document.createElement( "div" ),
            style = ctxContainer.style,
            media = context.media;

        var updatePosition = function() {
          var position = context.position();
          // the video element must have height and width defined
          style.width = media.offsetWidth + "px";
		  
		  style.top = position.top + "px";
          style.left = position.left + "px";

          setTimeout( updatePosition, 10 );
        };

        ctxContainer.id = Popcorn.guid();
        style.position = "absolute";
        style.textShadow = "black 2px 2px 6px";
        style.fontWeight = "bold";
        //style.textAlign = "center";

        updatePosition();

        context.media.parentNode.appendChild( ctxContainer );
      };

  /**
   * Caption popcorn plug-in 
   * Displays a caption over the video, or in the target div
   * Options parameter will need a start, end, posx, posy.
   * Optional parameters are target, text, color and size.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   * PosX is the X position in pixels (top) 
   * Target is the id of the document element that the content is
   *  appended to, this target element must exist on the DOM
   * Text is the text of the caption you want to display.
   *
   * @param {Object} options
   * 
   * Example:
     var p = Popcorn('#video')
        .caption({
          start:            5,                 // seconds, mandatory
          end:              15,                // seconds, mandatory
		  color:           'red',		       // optional
		  size:            '20',		       // pixels, optional
		  posx:			   '0', 			   // pixels, left
		  posy:			   '0',				   // pixels, top
          text:             'Hellow world',    // optional
          target:           'captiondiv',     // optional
        } )
   *
   */

  Popcorn.plugin( "caption" , {
    
      manifest: {
        about: {
          name: "Popcorn Caption Plugin",
          version: "1.0",
          author: "Moussa Tabcharani",
          website: "http://moussa1.wordpress.com/"
        },
        options: {
          start: {
            elem: "input", 
            type: "text", 
            label: "In"
          },
          end: {
            elem: "input", 
            type: "text", 
            label: "Out"
          },
          target: "caption-container",
          text: {
            elem: "input", 
            type: "text", 
            label: "Text"
          },
		  color: {
            elem: "input", 
            type: "text", 
            label: "Color"
          },
		  size: {
            elem: "input", 
            type: "text", 
            label: "FontSize"
          },
		  posx: {
            elem: "input", 
            type: "text", 
            label: "PositionX"
          },
		  posy: {
            elem: "input", 
            type: "text", 
            label: "PositionY"
          }
        }
      },

      _setup: function( options ) {
		
        var newdiv = document.createElement( "div" );

        newdiv.id = "caption-" + i++;
        newdiv.style.display = "none";
		newdiv.style.position = "absolute";
		newdiv.style.color = options.color;
		newdiv.style.fontSize = options.size + "px";

		newdiv.style.top = ( options.posy > this.position().height ) ? this.position().height + "px" : options.posy + "px";
		newdiv.style.left = ( options.posx > this.position().width ) ? this.position().width + "px" : options.posx + "px";
				
        // Creates a div for all captions to use
        ( !this.container && ( !options.target || options.target === "caption-container" ) ) && 
          createDefaultContainer( this );

        // if a target is specified, use that
        if ( options.target && options.target !== "caption-container" ) {
          options.container = document.getElementById( options.target );
        } else { 
          // use shared default container
          options.container = this.container;
        }
		
        document.getElementById( options.container.id ) && document.getElementById( options.container.id ).appendChild( newdiv );
        options.innerContainer = newdiv;

        options.showSubtitle = function() {
          options.innerContainer.innerHTML = options.text;
        };
      },
      /**
       * @member caption 
       * The start function will be executed when the currentTime 
       * of the video  reaches the start time provided by the 
       * options variable
       */
      start: function( event, options ){
        options.innerContainer.style.display = "inline";
        options.showSubtitle( options, options.text );
      },
      /**
       * @member caption 
       * The end function will be executed when the currentTime 
       * of the video  reaches the end time provided by the 
       * options variable
       */
      end: function( event, options ) {
        options.innerContainer.style.display = "none";
        options.innerContainer.innerHTML = "";
      },

      _teardown: function ( options ) {
        options.container.removeChild( options.innerContainer );
      }
   
  });

})( Popcorn );
