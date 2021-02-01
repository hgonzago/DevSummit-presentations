require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView"
], function(Map, FeatureLayer, MapView) {
  /******************************************************************
   *
   * Add featurelayers to the map example
   *
   ******************************************************************/

  // Create the layer
  const chicagoCrime = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Chicago_Crime_Tracts/FeatureServer/0"
  });
  
  // 2 - This additional point layer shows time aware data used for the
  //     TimeSlider
  // var vehicleThefts = new FeatureLayer({
  //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ChicagoCrime/FeatureServer/0"
  // });

  // Set map's basemap
  const map = new Map({
    basemap: "gray-vector"
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 10,
    center: [-87.66453728281347, 41.840392306471315]
  });

  view.when(function() {
    // Add the layer
    map.add(chicagoCrime);
    // map.addMany([chicagoCrime, vehicleThefts]);
  });
});
