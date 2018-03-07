require([
  "esri/layers/FeatureLayer",
  "esri/Map",
  "esri/WebScene",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/widgets/Home",
  "esri/core/watchUtils",
  "dojo/dom-construct",
  "dojo/domReady!"
], function(
  FeatureLayer,
  Map,
  WebScene,
  MapView,
  SceneView,
  Home,
  watchUtils,
  domConstruct
) {
  var popupView, sceneView, extDiv;

  // Create the map from the given web scene id
  var map = new WebScene({
    portalItem: {
      id: "5a392557cffb485f8fe004e668e9edc0"
    },
    ground: "world-elevation"
  });

  // Create the main scene View based off of the web scene in the map
  sceneView = new SceneView({
    map: map,
    container: "sceneViewDiv"
  });

  // Create a map to hold the 'streets' basemap layer for the popup
  var popupMap = new Map({
    basemap: "topo"
  });

  // Create a home button and add it to the scene view
  var homeBtn = new Home({
    view: sceneView
  });
  sceneView.ui.add(homeBtn, "top-left");

  // Listen for when the scene view is ready
  sceneView.when(function() {
    // Removing the extDiv section for now
    // // Create the extDiv element that will display the area clicked
    // extDiv = domConstruct.create(
    //   "div", {
    //     class: "extentDiv"
    //   }, document.getElementById("mapViewDiv")
    // );

    // Create the mapview for the popup map
    popupView = new MapView({
      container: document.getElementById("mapViewDiv"),
      map: popupMap,
      center: sceneView.center,
      scale:
        sceneView.scale *
        2 *
        Math.max(sceneView.width / 250, sceneView.height / 250),
      constraints: {
        rotationEnabled: false
      },
      ui: {
        components: []
      }
    });

    sceneView.on("click", function(event) {
      // you must overwrite default click-for-popup
      // behavior to display your own popup
      event.stopPropagation();
      sceneView.popup = {
        dockEnabled: true,
        dockOptions: {
          buttonEnabled: false,
          breakpoint: false
        }
      };
      // Remove any actions from the popup
      sceneView.popup.actions = [];
      // Create lat/lon vars to display in popup title
      var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
      var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

      sceneView.popup.open({
        // Set the popup's title to the coordinates of the location
        title: "Map view coordinates: [" + lon + ", " + lat + "]",
        location: event.mapPoint, // Set the location of the popup to the clicked location
        content: setContentInfo(
          event.mapPoint,
          sceneView.center,
          sceneView.scale,
          popupMap,
          document.getElementById("mapViewDiv")
        )
      });
    });

    function setContentInfo(point, center, scale, popupMap, mapDiv) {
      popupView.goTo({
        target: point,
        center: center,
        scale: scale
      });

      watchUtils.when(sceneView, "stationary", function() {
        popupView.goTo({
          center: sceneView.center,
          scale:
            sceneView.scale *
            2 *
            Math.max(
              sceneView.width / popupView.width,
              sceneView.height / popupView.height
            )
        });
      });

      // Return a dom node
      return popupView.container;
    }
  });
});
