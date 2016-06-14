
 /*global axios*/
 /*global Navigo*/
 /*global Handlebars*/
 
 /* BURNDOWN! */

 
/* Homescreen */

    /* Load photo of day into Handlebars? */
    /* homescreen loading part of the view.js */
    /* Model to load photo of day */
  
    /* Controller to move to stage */
    /* Controller to assing APOD to 'about this photo */
 
 
 /*  screen-stage */  
 
    /* Show about modal */
    
    /* move parser into controller.js */
    /* is data for parser part of model? */
    
    
    /* load UI to show rovers */
    
    
    /*  Load UI to show near earth objects */
    
    
    /* load user avatar */
 
 
  /* Save data locally */
  
  /* save data to cloud */
 
 
 /* Routing  http://work.krasimirtsonev.com/git/navigo/usage */
 
 /* Responsive */
 
 /* Optimization */
  /* SEO */
 /* Service workers */
 
 
 
  

  /* Routing stuff */
  
    // Title screen
    
    // Stage
    
    
    // Rover landing
    
    
      // Rover detail



    // Near earth landing
    
    
      // near earth detail



    // About
 
 
 
 
 
 
 
 
 
         
 
 
 // Module Pattern!
 var spaceRESTmodule = {
   
    // Configuraiton
    settings: {
        
        // URLS
        
            nasaKey:        'Xviwor5Dq7DoPAYge8grYDkRWDHpNXORUobbJmEG',
            apodAPIurl:     'https://api.nasa.gov/planetary/apod?date=',
            apodFallback:   'https://apod.nasa.gov/apod/image/1605/M42_HaGB_Spitzer_PortraitR.jpg',
            
        
        // Elements
        viewUserScore:      document.getElementById("userScore"),       // User Score
        
        viewScreenTitle:    document.getElementById("screen-title"),   // Our SpaceREST logo
        
        viewParser:         document.getElementById("screen-parser"),
        controllerParser:   document.getElementById("textParser"),
        
        viewBackground:     document.getElementById("screen-background"),   // Background image holder
        viewAPODSelector:   document.getElementById('backgroundAPOD'),

        viewLanding:        document.getElementById("screen-landing"), // POst-title landing page
        
        
        
        
        

        
        backgroundImage:    false,
        homepageLogo:       false,
        landing:            false,
        about:              false,
        firsttime:          true,
        parser:             false
    },
    
     
    // Activate home screen!
    viewActivateSpaceRestHome: function(){
      
      this.settings.backgroundImage = true;
      this.settings.homepageLogo = true;
      this.settings.landing = false;
      this.settings.parser = false;
      

      this.controllerHomeScreenParser();
      
      if(spaceRESTmodule.settings.viewAPODSelector.title == ''){
        this.getPhotoOfTheDay();   
      }
       
      
      this.viewActivateSpaceRestScreen();

    },
     
    // Activate landing screen!
    viewActivateSpaceRestLanding: function(){
      
      this.settings.backgroundImage = true;
      this.settings.homepageLogo = false;
      this.settings.landing = true;
      this.settings.parser = true;
      
      if(this.settings.viewUserScore.innerHTML == 0){
        this.settings.viewUserScore.innerHTML = this.getTodaysMarsDate();
      }
      
      this.viewActivateSpaceRestScreen();
      this.controllerResetParser();
      this.controllerStartParser();
      
      
        this.getMyAsteroids();
      
      
        // Just curiosity now. 
        this.getThisRover("curiosity");
 
 
    },
     
     
     
     
     
     
// Use our configuration object to show-hide content
    viewActivateSpaceRestScreen: function(){

    // showhide Nasa photo of the day            
        if (this.settings.backgroundImage === true) {
            this.settings.viewBackground.setAttribute("style"," ");
        } else {
            this.settings.viewBackground.setAttribute("style","visibility:hidden;");
        }


    // showhide Space Rest logo
        if (this.settings.homepageLogo === true) {
            this.settings.viewScreenTitle.setAttribute("style"," ");
        } else {
            this.settings.viewScreenTitle.setAttribute("style","visibility:hidden;");
        }
        

    // showhide landing
        if (this.settings.landing === true) {
            this.settings.viewLanding.setAttribute("style"," ");
        } else {
            this.settings.viewLanding.setAttribute("style","visibility:hidden;");
        }   

    // showhide Parser, and set focus
        if (this.settings.parser === true) {
            this.settings.viewParser.setAttribute("style"," ");
        } else {
            this.settings.viewParser.setAttribute("style","visibility:hidden;");
        } 

    },
     
     
     
     
     
// Set focus in our parser.  Gonna call this one like all the damn time.
    controllerResetParser: function(){
        spaceRESTmodule.settings.controllerParser.focus();
    },
 
 
 
// Home screen Enter sequence
    controllerHomeScreenParser: function(){
        var homeParserListener = new window.keypress.Listener();
    
        // keypress for move to Landing
        homeParserListener.simple_combo("enter", function() {
            spaceRESTmodule.viewActivateSpaceRestLanding();
   
    
        // We just need this once.
        homeParserListener.unregister_combo("enter");
    
        }, true);
    
    },
     
     
     
// Text parser!
    controllerStartParser: function(){

        // keyboard input
        var parserListener = new window.keypress.Listener();
 
        // keypress for about
        parserListener.sequence_combo("a b o u t enter", function() {
            
            spaceRESTmodule.settings.controllerParser.value = "";
            spaceRESTmodule.spaceRESTmodal("About SpaceREST","An experiment blending NASA's Data APIs, javascript, and a love of old Sierra games.","Source at github.com/patd");
            spaceRESTmodule.controllerResetParser();
            
        }, true);
        
        
        // keypress for photo about
        parserListener.sequence_combo("p h o t o enter", function() {
            
            spaceRESTmodule.settings.controllerParser.value = "";
            spaceRESTmodule.spaceRESTmodal(spaceRESTmodule.settings.viewAPODSelector.title,spaceRESTmodule.settings.viewAPODSelector.alt, "");
            spaceRESTmodule.controllerResetParser();
            
        }, true);
        
        
      
      // keypress for Rovers
          parserListener.sequence_combo("r o v e r s enter", function() {
        
          console.log("Rovers");
        
        }, true);
      
      
      // Keypress for home
        parserListener.sequence_combo("h o m e enter", function() {
        
          console.log("Home");
        
        }, true);
      
      
      
      // keypress for near earth
            parserListener.sequence_combo("e a r t h enter", function() {
        
          console.log("earth");
        
        }, true); 
       
       
   
   
    }, //spaceRestTextParser
     

      


      
      
      
       
     // Computes the day number (1-365). Returns integer.
      getTodaysDayNumber: function(){
          var _now = new Date();
          var _start = new Date(_now.getFullYear(), 0, 0);
          var _diff = _now - _start;
          var _oneDay = 1000 * 60 * 60 * 24;
          var day = Math.floor(_diff / _oneDay);
          
          return day;
      },
  
  
    // Computess a previous date.  Default value is 1.
      getpastDate: function(daysBack = 1){
    
          var todayTimeStamp = +new Date; // Unix timestamp in milliseconds
          var oneDayTimeStamp = 1000 * 60 * 60 * 24 * daysBack; // Milliseconds in a day times parameter
          var diff = todayTimeStamp - oneDayTimeStamp;
          var yesterdayDate = new Date(diff);
          var yesterdayString = yesterdayDate.getFullYear() + '-' + (yesterdayDate.getMonth() + 1) + '-' + yesterdayDate.getDate();
        
          return yesterdayString;
      },
      
  
  
    // Computes the approximate sol on Mars. Returns integer
      getTodaysMarsDate: function(){
      
        var _earthDay = spaceRESTmodule.getTodaysDayNumber();
        
        var _martianSol;
        var _martianSolDigits;
        const _earthDaysTotal = 365;  // How many earthy days are there?
        const _marsDaysTotal = 687; // How manys marsish days are there?
        const _planetDifference = _marsDaysTotal / _earthDaysTotal;  
        
        _martianSolDigits = _planetDifference * _earthDay;
        
        _martianSol = parseInt(_martianSolDigits,10);
        
        return _martianSol;
      },
      
      
    // Function to open modal. Accepts headline and two parargraphs
      spaceRESTmodal: function(headline, paragraph1, paragraph2){
      
        var _headline = headline;  // a variable called _headline is the same as the paramter headline
        var _paragraph1 = paragraph1;
        var _paragraph2 = paragraph2;
        
        var _modalHeadline = document.getElementById('dialogTitle');
        var _modalP1 = document.getElementById('dialog1');
        var _modalP2 = document.getElementById('dialog2');
        
        _modalHeadline.innerHTML = _headline;
        _modalP1.innerHTML = _paragraph1;
        _modalP2.innerHTML = _paragraph2;
        
        
        // A11y dialog maker
        var dialogEl = document.getElementById('my-accessible-dialog');
        var mainEl = document.getElementById('main');
        var dialog = new window.A11yDialog(dialogEl, mainEl);  
        
        // Opens Dialog 
        dialog.show();
            this.controllerResetParser();
      },
 
 
 
 
 
 
 
 
   // Gets asteroids of the day
   getMyAsteroids: function(){
       
    // Indiv Asteroid: https://api.nasa.gov/neo/rest/v1/neo/3015691?api_key=DEMO_KEY

    // Query Today's feed
    axios.get('https://api.nasa.gov/neo/rest/v1/feed/today?api_key=' + spaceRESTmodule.settings.nasaKey)
    
        .then(function(asteroids){
          
        // Update the Number of elements View
        var _asteroidCount = asteroids.data.element_count;
        document.getElementById("asteroidCount").innerHTML = _asteroidCount;
        
        
        // Each feed has a differnt date.
        var _getAsteroidfeedDate = function(){
    
            var _obj = asteroids.data.near_earth_objects;
                for (var _key in _obj) {
                return _key;
             }
        };
        
        
        
        var _applyAsteroidsToTemplate = function(){
            
            // Selects asteroid array based on date
            var _firstLevelDownAsteroids = _getAsteroidfeedDate();
            var _scopedAsteroids = asteroids.data.near_earth_objects[_firstLevelDownAsteroids];


            // Handlebars Template
            var source   = document.getElementById('text-template').innerHTML;
            var template = Handlebars.compile(source);
            
            // Loads just the astroids, no links
            var context = _scopedAsteroids;
            var html    = template(context);
 
            document.getElementById('asteroidListing').innerHTML = html;
            
        };


    _applyAsteroidsToTemplate();
   
    
 
     
      }).catch(function(asteroids) {
     //   console.log('Error Asteroids!')
     });
     
   },
 
 
 
 
 
 
 

 
 
 
 
 
 
 
 
 
 
   // Gets Picture of the day.  Defaults to 1 day back. Accepts paramter to change number
    getPhotoOfTheDay: function(daysback = 10){
      
        // The number of times we'll try hitting NASA's APOD before giving up
        var _daysbehind = daysback;
        
        // Event Handler for the loading of the image.  Then Pixelate it!
        this.settings.viewAPODSelector.onload = function(){
          this.pixelate();
        };
        
       
        // Loads APOD. Checks if an image before showing.
        // Sometimes they're Youtube videos.
        
        var i;
       
        // We're looping, and we haven't already filled this background
        for(i=0; i < _daysbehind; i++) {
            
            var _dateformat = spaceRESTmodule.getpastDate(i);
          //  console.log(apodAPIurl + _dateformat + '&api_key=' + this.settings.nasaKey);
            
            axios.get(this.settings.apodAPIurl +_dateformat + '&api_key=' + this.settings.nasaKey)
                .then(function(apod){
            
            
                // If it's a photo, we show it
                if(apod.data.media_type == 'image'){
                    // console.log("I am an image");
                    
                   spaceRESTmodule.settings.viewAPODSelector.src = apod.data.url;
                   spaceRESTmodule.settings.viewAPODSelector.title = apod.data.title;
                   spaceRESTmodule.settings.viewAPODSelector.alt = apod.data.explanation;
                   
               //    spaceRESTmodule.spaceRESTmodal("About this image", apod.data.title + ": " + apod.data.explanation, apod.data.date);
                
                   
                }
            
      
         // If all else fails
          }
          
          ).catch(function(asteroids) {
            // viewAPODSelector.src = apodFallback;       // console.log('Error Retreving Photo of the day!');
         });
            
            
            
          
        return true;
            
            
        };  // loop end  

     }, // Getphotoof theday
     
     
     
    
  /* 8888888888888888888888888888888888888888888888888888 */ 
     
     
     
     
     
     
// Loads rover photos. Defaults to Curiosity
    getThisRover: function(roverName="curiosity", daysback=10) {
    
        // Accepts other over names.
        var _roverName = roverName;
        
        // The number of times we'll try hitting NASA's API before giving up
        var _daysbehind = daysback;
        
        
        // We loop the dates back in time. Starting 3 days back
        var i;
        for (i=3; i < daysback; i++){
            
            var yesterdayString = spaceRESTmodule.getpastDate(i);
            
            axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' + _roverName + '/photos?earth_date=' + yesterdayString + '&api_key=' + this.settings.nasaKey)
                .then(function(rover){
                    
                if(rover.data.photos){
                    console.log(rover.data); 
                    
                        var _applyRoversToTemplate = function(){
            
            // Selects asteroid array based on date
      //      var _firstLevelDownAsteroids = _getAsteroidfeedDate();
      //      var _scopedAsteroids = asteroids.data.near_earth_objects[_firstLevelDownAsteroids];


            // Handlebars Template
            var source   = document.getElementById('rover-template').innerHTML;
            var template = Handlebars.compile(source);
            
            // Loads just the astroids, no links
            var context = rover.data;
            var html    = template(context);
 
            document.getElementById('roverListing').innerHTML = html;
            
        };
        
        
        
        _applyRoversToTemplate();
                }
              
    
            }).catch(function(rover) {
                console.log('Error communicating with Mars!');
            });
            
            
           return true;
        } // Loop
        
        
        
        
     
        
       
        
        
        
        
        
        
        
        
        

    },  // Get Rover
     
     
     
     
     
     
     
     
     
     
     
     
  /* 8888888888888888888888888888888888888888888888888888 */   
   
 };  // spaceRESTmodule


 





var router = new Navigo();
 /*
 router.on('/about', function () {
    console.log('About')
});
*/
 
 // router.navigate('about');
 
 
 router.on({
  '/about': function () {
    console.log('This is the about route');
  },
  '/landing/rovers': function () {
   console.log('Rovers landing page');
  },
  '/landing/asteroids': function () {
   console.log('Asterioids landing page');
   spaceRESTmodule.getMyAsteroids();
  },
  '/landing': function () {
     console.log('Landing landing page');
     
     spaceRESTmodule.viewActivateSpaceRestLanding();
   //   console.log(spaceRESTmodule.settings);
     
  },
  '*': function () {

     console.log('Home');

    spaceRESTmodule.viewActivateSpaceRestHome();

  }
});
 
 
 

 
 
 
 
 
 
 

  /*
 
 // Text parser!
 var spaceRestTextParser = function(){

  // keyboard input
 
 var parserListener = new window.keypress.Listener();
 

  // keypress for about
    parserListener.sequence_combo("a b o u t enter", function() {
    
      console.log("About");
      textParserInput.value = "";
      textParserInput.focus(); 
       spaceRESTmodule.spaceRESTmodal("About SpaceREST","An experiment blending NASA's Data APIs, javascript, and a love of old Sierra games.","Source at github.com/patd");
    
    }, true);
  
  // keypress for Rovers
      parserListener.sequence_combo("r o v e r s enter", function() {
    
      console.log("Rovers");
    
    }, true);
  
  
  // Keypress for home
        parserListener.sequence_combo("h o m e enter", function() {
    
      console.log("Home");
    
    }, true);
  
  
  
  // keypress for near earth
        parserListener.sequence_combo("e a r t h enter", function() {
    
      console.log("earth");
    
    }, true); 
   
   
   
   
 }; //spaceRestTextParser
 
 
 
 
 
 
 */
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /*


var notepad = {
  notes: [
    {
  "copyright": "Florian Breuer",
  "date": "2016-05-16",
  "explanation": "In front of a famous background of stars and galaxies lies some of Earth's more unusual trees. Known as quiver trees, they are actually succulent aloe plants that can grow to tree-like proportions. The quiver tree name is derived from the historical usefulness of their hollowed branches as dart holders. Occurring primarily in southern Africa, the trees pictured in the above 16-exposure composite are in Quiver Tree Forest located in southern Namibia. Some of the tallest quiver trees in the park are estimated to be about 300 years old. Behind the trees is light from the small town of Keetmanshoop, Namibia. Far in the distance, arching across the background, is the majestic central band of our Milky Way Galaxy. Even further in the distance, visible on the image left, are the Large and Small Magellanic Clouds, smaller satellite galaxies of the Milky Way that are prominent in the skies of Earth's southern hemisphere.",
  "hdurl": "http://apod.nasa.gov/apod/image/1605/quivertrees_breuer_3000.jpg",
  "media_type": "image",
  "service_version": "v1",
  "title": "Milky Way Over Quiver Tree Forest",
  "url": "http://apod.nasa.gov/apod/image/1605/quivertrees_breuer_1080.jpg"
}
    
    
    
    ]
  
};
 


 var NotesList = React.createClass({
   
   componentDidMount: function(){
     
     
  axios.get('https://api.nasa.gov/planetary/apod?api_key=' + nasaKey)
    .then(function(apod){
     // console.log(apod.data); // ex.: { user: 'Your User'}
    //  console.log(apod.data.media_type); // ex.: { user: 'Your User'}
    // console.log(apod.data);
     console.log(apod)
     return apod;
     
      }).catch(function(asteroids) {
        console.log('Error Photo of the day!');
     });
     
     
   },
    render: function () {
      
      var notes = this.props.notepad.notes;
      



        return (
            <div className="note-list">
                {
                    notes.map(function (note) {
                        var title = note.title.substring(0,
                            note.title.indexOf('\n')
                        );
                        // title = title || note.title;
                    
                        return (
                          <div>
                            <img src={note.url} />
                            <div>{note.title}</div>
                          </div>
                        );
                    })
                }
            </div>
        );
    }
});

ReactDOM.render(
    <NotesList notepad={notepad}/>,
   document.getElementById("test"));
 
*/
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 








 
 




 
 
 
 
 
 
 
 
 var getThisRover = function(roverName){
   
   var yesterdayString = spaceRESTmodule.getpastDate();
   
      axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverName + '/photos?earth_date=' + yesterdayString + '&api_key=' + spaceRESTmodule.settings.nasaKey)
      .then(function(rover){
        console.log(rover.data); // ex.: { user: 'Your User'}
      }).catch(function(rover) {
        console.log('Error!')
     })
   };

 // getThisRover("curiosity");
 





/*



 var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter;
 
 
 
 // Main layout.  HOlds nav and big main div
 var MainLayout = React.createClass({
  render: function() {
    return (
      
         <main className="col-sm-9  col-md-12 main">
          {this.props.children}
         </main>

      )
  }
})





// Index is home
var Home = React.createClass({
 getInitialState: function(){
   return {

    }
 },
 
 
 render: function() {
    return (
      <div>
      <h1>SPACE REST!</h1>
      
          <p>STuff!</p>
      </div>
      )
  }
})




var SearchLayout = React.createClass({
  render: function() {
    return (
      <div className="search">
        <header className="search-header"></header>
        <div className="results">
          {this.props.children}
        </div>
        <div className="search-footer pagination"></div>
      </div>
      )
  }
})







var Asteroids = React.createClass({
  render: function() {

      getMyAsteroids();

    return (
      <div id="Asteroids">
        <h1>Asteroids!</h1>
        <ul className="widget-list">
          <li>Widget 1</li>
          <li>Widget 2</li>
          <li>Widget 3</li>
        </ul>
      </div>
      )
  }
})


var Rovers = React.createClass({
  render: function() {
    
    
    return (
            <div id="Rovers">
        <h1>Rovers!!</h1>
        <ul className="widget-list">
          <li>Rovers 1</li>
          <li>Rovers 2</li>
          <li>Rovers 3</li>
        </ul>
      </div>
      )
  }
})


// Note that with how CodePen works, I wasn't able to get the browserHistory to work
// as the article suggests. The demo works without it, but you'll want to be sure to 
// use it in a real 


ReactDOM.render((
  <Router>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={Home} />
      <Route component={SearchLayout}>
        <Route path="Rovers" component={Rovers} />
        <Route path="Asteroids" component={Asteroids} />
      </Route> 
    </Route>
  </Router>
), document.getElementById('root'));



 
 
 
 

    
    
    
 
 
 
 
 
 
 
 
 /* Sample 
 var TweetBox = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      photoAdded: false
    };
  },
  handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  togglePhoto: function(event) {
    this.setState({ photoAdded: !this.state.photoAdded });
  },
  overflowAlert: function() {
    if (this.remainingCharacters() < 0) {
      if (this.state.photoAdded) {
        var beforeOverflowText = this.state.text.substring(140 - 23 - 10, 140 - 23);
        var overflowText = this.state.text.substring(140 - 23);
      } else {
        var beforeOverflowText = this.state.text.substring(140 - 10, 140);
        var overflowText = this.state.text.substring(140);
      }

      return (
        <div className="alert alert-warning">
          <strong>Oops! Too Long:</strong>
          &nbsp;...{beforeOverflowText}
          <strong className="bg-danger">{overflowText}</strong>
        </div>
      );
    } else {
      return "";
    }
  },
  remainingCharacters: function() {
    if (this.state.photoAdded) {
      return 140 - 23 - this.state.text.length;
    } else {
      return 140 - this.state.text.length;
    }
  },
  render: function() {
    return (
      <div className="well clearfix">
        { this.overflowAlert() }
        <textarea className="form-control"
                  onChange={this.handleChange}></textarea>
        <br/>
        <span>{ this.remainingCharacters() }</span>
        <button className="btn btn-primary pull-right"
          disabled={this.state.text.length === 0 && !this.state.photoAdded}>Tweet</button>
        <button className="btn btn-default pull-right"
          onClick={this.togglePhoto}>
          {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
        </button>
      </div>
    );
  }
});

ReactDOM.render(
  <TweetBox />,
  document.getElementById("container4")
);
 
 
 */
 
 
 
 /* Load HTML as JSX - header, nav, body */
 
 
 
 /* Populate picture of the day  */
    /*  HTML template */
 
 
 
 /*  Mars photos - sort and fitler by rover type! */
    /* Make this a component */
    
    
 
 
 
 
 
 
 /* most basic element
 
 ReactDOM.render(
        <h1>This is React!</h1>,
        document.getElementById('container')
    );
 
 
 
 
 
 
 /* Makes a custom element 
 var MyComponent = React.createClass({
    render: function(){
        return (
            <h2>Hello, world!</h2>
        );
    }
});
 
 
 ReactDOM.render(
    <MyComponent/>,
    document.getElementById('container2')
);
 
 
 
 
 
 
 /* Props - resuse and element 
 
 var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, {this.props.name}!</h1>
        );
    }
});

ReactDOM.render(<MyComponent name="User" />, document.getElementById('container'));
 
 */
 
 
 
 
 
 
 /* State */
 
 /*
 var MyComponent = React.createClass({
    getInitialState: function(){
        return {
            count: 5
        }
    },
    render: function(){
        return (
            <h1>{this.state.count}</h1>
        )
    }
});
 
 
 
 
 
 

var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div class="my-component">
        <h1>Count: {this.state.count}</h1>
        <button type="button" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});

ReactDOM.render(<Counter/>, document.getElementById('container2'));
 
 
 
 
 
 
 
 
 
 var FilteredList = React.createClass({
  filterList: function(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },
  getInitialState: function(){
     return {
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns"
       ],
       items: []
     }
  },
  componentWillMount: function(){
    this.setState({items: this.state.initialItems})
  },
  render: function(){
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
    return (
      <ul>
      {
        this.props.items.map(function(item) {
          return <li key={item}>{item}</li>
        })
       }
      </ul>
    )  
  }
});

ReactDOM.render(<FilteredList/>, document.getElementById('container2'));
 
 
 
 */
 
 
 
 
 
 
 /*
 
 
 // App
var App = React.createClass({
render: function() {
 return (
   <div>
     <Nav />
     <Header />
   </div>
  )
 }
});
 
// Nav
var Nav = React.createClass({
 render: function() {
   return (
    <ul className="nav nav-pills">
      <li role="presentation" className="active">Home</li>
      <li role="presentation">Profile</li>
      <li role="presentation">Messages</li>
    </ul>
  )
 }
});
 
// Header
var Header = React.createClass({
 render: function() {
   return (
     <h1 className="foo">Hello, #Main!</h1>
   )
 }
});
 
ReactDOM.render(<App/>, document.querySelector("#main"));
 
 
 
 */
 
 
 
 
 
 
 
 
 
 
 /*
    var Counter = React.createClass({
        getInitialState: function () {
          return { count: 0 };
        },
        handleClick: function () {
          this.setState({
            count: this.state.count + 1,
          });
        },
        render: function () {
          return (
            <button onClick={this.handleClick}>
              Click me! Number of clicks: {this.state.count}
            </button>
          );
        }
      });
      
      
      ReactDOM.render(
        <Counter />,
        document.getElementById('container')
      );
      
      
      var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('container2')
);

*/

/* Picture of the day background */
