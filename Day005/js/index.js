var platform = new H.service.Platform({
    apikey: "the-key"
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 4,
      center: { lat: -22.327854, lng: -46.7244578 },
      pixelRatio: window.devicePixelRatio || 1
    });

var ui = H.ui.UI.createDefault(map, defaultLayers);

var mapEvents = new H.mapevents.MapEvents(map);

// map.addEventListener('tap', function(evt) { 
//   console.log(evt.type, evt.currentPointer.type); 
// });

var behavior = new H.mapevents.Behavior(mapEvents);