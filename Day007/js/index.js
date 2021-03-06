var platform = new H.service.Platform({
  apikey: 'key'
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 13,
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
      console.log(position.coords);
  });
} else {
  console.error("Geolocation is not supported by this browser!");
}

