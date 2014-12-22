var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var parseFeed = function(data) {
  var items = [];
  //for(var i = 0; i < quantity; i++) {
  for(var i = 0; i < data.length; i++) {
    // Always upper case the description string
    var title = data[i].cinema;

    // Get date/time substring
    var time = data[i].description;

    // Add to menu items array
    items.push({
      title:title,
      subtitle:time
    });
  }

  // Finally return whole array
  return items;
};
var parseListMovie = function(data) {
  var items = [];
  //for(var i = 0; i < quantity; i++) {
  for(var i = 0; i < data.length; i++) {
    // Always upper case the description string
    var name = data[i].name;
    var rating = data[i].rating;
    var system = data[i].system;
    var language = data[i].language;
    //var theatre = data[i].theatre;
    //var showtime = [];
    var showtime = data[i].theatre+' \n';
    for(var j = 0; j < data[i].showtime.length; j++){
      showtime += data[i].showtime[j]+' ';
    }
    var title = name;
    var detail = '('+rating+') ('+system+') '+language;
    
    // Add to menu items array
    items.push({
      title:title,
      subtitle:detail,
      showtime:showtime
    });
  }

  // Finally return whole array
  return items;
};

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Downloading Cinema data...',
  font:'GOTHIC_28_BOLD',
  color:'white',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'black'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

// Make request to openweathermap.org
ajax(
  {
    url:'http://nppi3enz.in.th/timemovieth/fetch.php',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
    var menuItems = parseFeed(data);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Current Cinema',
        items: menuItems
      }]
    });
    
    // Add an action for SELECT
    resultsMenu.on('select', function(e) {
      console.log('Item number ' + e.itemIndex + ' was pressed!');
      
      //fetch in cinema
      ajax(
      {
        url:'http://nppi3enz.in.th/timemovieth/cinema.php?id='+e.itemIndex,
        type:'json'
      },
      function(data){
          var movieItems = parseListMovie(data);
        
        // Construct Menu to show to user
          var resultsMovie = new UI.Menu({
            sections: [{
              title: e.item.title,
              items: movieItems
            }]
          });
        resultsMovie.on('select', function(p) {
          var detailCard = new UI.Card({
            title: p.item.title,
            subtitle:p.item.subtitle,
            body: p.item.showtime,
            scrollable:true
          });
          detailCard.show();
           /* var showT = "";
            for(var x=0;x<p.showtime.length;x++){
              showT += p.showtime[x];
            }
            // Create the Card for detailed view
            var detailCard = new UI.Card({
              title:p.name,
              subtitle:p.detail,
              body: p.cinema+'\n'+showT
            });
            detailCard.show();*/
        });
        
        resultsMovie.show();
        //resultsMenu.hide();
      });
      
      
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);
