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
      zoom: 8,
      center: { lat: 0, lng: 0 },
      pixelRatio: window.devicePixelRatio || 1
    });

var ui = H.ui.UI.createDefault(map, defaultLayers);

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

function getBrowserLocation () {
  // Get current location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation_success, getLocation_error);
    
  } else {
    console.error("Geolocation is not supported by this browser!");
    return {lat: 0, lng: 0};
  }
}

function getLocation_success(pos){
  let browserPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude};
  map.setCenter(browserPosition);
  addDraggableMarker(browserPosition);
}

function getLocation_error(err){
  console.warn('ERROR(' + err.code + '): ' + err.message);
  let browserPosition = {lat: 0, lng: 0};
  addDraggableMarker(browserPosition);
}

getBrowserLocation();

function addDraggableMarker(browserPosition){

  var marker = new H.map.Marker({lat: browserPosition.lat, lng: browserPosition.lng}, {
    // mark the object as volatile for the smooth draggingg
    volatility: true
  });
  // Ensure that the marker can receive drag events
  marker.draggable = true;
  map.addObject(marker);

  addCircleToMap(browserPosition);

  // disable the default draggability of the underlying map
  // and calculate the offset between mouse and target's position
  // when starting to drag a marker object:
  map.addEventListener('dragstart', function(ev) {
    var target = ev.target,
        pointer = ev.currentPointer;
    if (target instanceof H.map.Marker) {
      var targetPosition = map.geoToScreen(target.getGeometry());
      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
      behavior.disable();
    }
  }, false);

  // re-enable the default draggability of the underlying map
  // when dragging has completed
  map.addEventListener('dragend', function(ev) {
    var target = ev.target;
    var pointer = ev.currentPointer;
    if (target instanceof H.map.Marker) {
      behavior.enable();
      addCircleToMap({lat: target.b.lat, lng: target.b.lng});
    }
  }, false);

  // Listen to the drag event and move the position of the marker
  // as necessary
   map.addEventListener('drag', function(ev) {
    var target = ev.target,
        pointer = ev.currentPointer;
    if (target instanceof H.map.Marker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
    }
  }, false);
}

var mapCircle = null;

function addCircleToMap(browserPosition) {

  console.warn('addCircleToMap: ' + browserPosition.lat + ' - ' + browserPosition.lng);

  if (mapCircle !== null)
    map.removeObject(mapCircle);

  mapCircle = new H.map.Circle(
    // The central point of the circle
    browserPosition,
    // The radius of the circle in meters
    1000 * 10, // 1000 meters * 10
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
      }
    }
  );

  map.addObject(mapCircle);
}
