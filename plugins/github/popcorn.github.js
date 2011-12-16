// PLUGIN: Github
/**
 * Github popcorn plug-in
 * Displays github information about a specific username's repo in the target div
 * Options parameter will need a start, end, target, username and repo
 * Start is the time that you want this plug-in to execute
 * End is the time that you want this plug-in to stop executing
 * Target is the id of the document element that the content is
 *  appended to, this target element must exist on the DOM
 * Username is the username where we want to pull the repo information from
 * Repo is the repository name at the given username's github
 *
 * @param {Object} options
 *
 * Example:
   var p = Popcorn( "#video" )
      .github({
        target: "githubdiv",
        start : 3,
        end   : 10,
        username: "moussa1",
        repo: "popcorn-js"
      } )
 *
 */

(function( Popcorn, global ) {

  var data2;

  Popcorn.plugin( "github" , {
    manifest: {
      about: {
        name: "Popcorn Github Plugin",
        version: "0.1",
        author: "Moussa Tabcharani",
        website: "moussa1.wordpress.com"
      },
      options: {
        target: {
          elem: "input",
          type: "text",
          label: "ParentDiv"
        },
        start: {
          elem: "input",
          type: "number",
          label: "In"
        },
        end: {
          elem: "input",
          type: "number",
          label: "Out"
        },
        username: {
          elem: "input",
          type: "text",
          label: "Username"
        },
        repo: {
          elem: "input",
          type: "text",
          label: "Repo"
        }
      }
    },

    _setup: function( options ) {
      var target = document.getElementById( options.target );

      // Checks if the plugins target container exists
      if ( !target && Popcorn.plugin.debug ) {
        throw new Error( "Github target container doesn't exist" );
      }
      else {
        Popcorn.getJSONP( "http://github.com/api/v2/json/repos/show/" + options.username + "/" + options.repo + "?callback=github", function( data ) {
          DOMdata = data;
        } , false );
      }
    },
    /**
    * @member github
    * The start function will be executed when the currentTime
    * of the video reaches the start time provided by the
    * options variable
    */
    start: function( event, options ) {
    var target = document.getElementById( options.target );
    if ( target ) {
        if ( DOMdata.repository ) {
          var iterateTags = function ( tagName, tagValue ) {
            var elements = document.querySelectorAll( "#" + options.target + " span#" + tagName );

            if ( elements && elements.length > 0 ) {
              for ( var i = 0; i < elements.length; i++ ) {
                elements[i].innerHTML = tagValue;
              }
            }
          }

          iterateTags( "created_at", DOMdata.repository.created_at );
          iterateTags( "description", DOMdata.repository.description );
          iterateTags( "fork", DOMdata.repository.fork );
          iterateTags( "forks", DOMdata.repository.forks );
          iterateTags( "has_downloads", DOMdata.repository.has_downloads );
          iterateTags( "has_issues", DOMdata.repository.has_issues );
          iterateTags( "has_wiki", DOMdata.repository.has_wiki );
          iterateTags( "homepage", DOMdata.repository.homepage );
          iterateTags( "language", DOMdata.repository.language );
          iterateTags( "master_branch", DOMdata.repository.master_branch );
          iterateTags( "name", DOMdata.repository.name );
          iterateTags( "open_issues", DOMdata.repository.open_issues );
          iterateTags( "owner", DOMdata.repository.owner );
          iterateTags( "parent", DOMdata.repository.parent );
          iterateTags( "private", DOMdata.repository.private );
          iterateTags( "pushed_at", DOMdata.repository.pushed_at );
          iterateTags( "size", DOMdata.repository.size );
          iterateTags( "source", DOMdata.repository.source );
          iterateTags( "url", DOMdata.repository.url );
          iterateTags( "watchers", DOMdata.repository.watchers );
        }
      }
    },
    /**
    * @member github
    * The end function will be executed when the currentTime
    * of the video reaches the end time provided by the
    * options variable
    */
    end: function( event, options ) {
      var target = document.getElementById( options.target );
      if ( target ) {
        target.style.display = "none";
      }
    }
  });
})( Popcorn, this );
