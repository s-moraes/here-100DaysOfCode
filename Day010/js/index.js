var platform = new H.service.Platform({
    apikey: 'the-key'
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 8,
      center: { lat: 0, lng: 0 },
      pixelRatio: window.devicePixelRatio || 1
    });

var ui = H.ui.UI.createDefault(map, defaultLayers);

var mapEvents = new H.mapevents.MapEvents(map);

var behavior = new H.mapevents.Behavior(mapEvents);

// Get an instance of the geocoding service:
var service = platform.getSearchService();

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    let browserPosition = { lat: position.coords.latitude, lng: position.coords.longitude};

    var svgMarkup = '<svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">' +
                    '<circle cx="25" cy="25" r="20" stroke="white" stroke-width="3" fill="#044B94" fill-opacity="0.4" />' +
                    '</svg>';

      // Create an icon, an object holding the latitude and longitude, and a marker:
      var icon = new H.map.Icon(svgMarkup),
      marker = new H.map.Marker(browserPosition, {icon: icon});

      // Add the marker to the map and center the map at the location of the marker:
      map.addObject(marker);

      map.setCenter(browserPosition);
    });
} else {
  console.error("Geolocation is not supported by this browser!");
}

function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener('tap', function (evt) {
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
    console.log('Clicked at ' + Math.abs(coord.lat.toFixed(4)) +
        ((coord.lat > 0) ? 'N' : 'S') +
        ' ' + Math.abs(coord.lng.toFixed(4)) +
         ((coord.lng > 0) ? 'E' : 'W'));
  });
}

setUpClickListener(map);
