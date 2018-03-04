require([
    "esri/layers/FeatureLayer",
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/core/watchUtils",
    "dojo/domReady!"
  ], function (
  FeatureLayer,
  Map,
  MapView,
  SceneView,
  watchUtils
) {

  var view;
  var sceneView;

  var map = new Map({
    basemap: "satellite",
    ground: "world-elevation"
  });
  var popupMap = new Map({
    basemap: "streets"
  });

  sceneView = new SceneView({
    container: "sceneViewDiv",
    map: map
  });

  sceneView.when(function () {
    sceneView.goTo({
      center: [15, 40],
      scale: 25000000,
    }, {
      animate: false
    });
  });

  sceneView.on("click", function (event) {
    // you must overwrite default click-for-popup
    // behavior to display your own popup
    event.stopPropagation();
    sceneView.popup.actions = [];

    var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
    var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
    sceneView.popup.open({

      // Set the popup's title to the coordinates of the location
      title: "Map view coordinates: [" + lon + ", " + lat + "]",

      location: event.mapPoint, // Set the location of the popup to the clicked location
      content: setContentInfo(event.mapPoint,
        sceneView.zoom,
        popupMap,
        document.getElementById("mapViewDiv"))
    });
  });

  function setContentInfo(point, zoomLevel, popupMap, mapDiv) {
    if (view === undefined) {
      view = new MapView({
        container: mapDiv,
        map: popupMap,
        zoom: Math.round(zoomLevel)
      });
    }

    // Watch view's stationary property for becoming true.
    watchUtils.whenTrue(view, "ready", function () {
      //listen for zoom change
      view.goTo({
        target: point,
        zoom: view.zoom
      });
    });

    // view.ui.components = ["attribution"];
    return view.container;
  }
});
