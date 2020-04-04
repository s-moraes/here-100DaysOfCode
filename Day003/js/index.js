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
      zoom: 12,
      center: { lat: -22.327854, lng: -46.7244578 }
    });
