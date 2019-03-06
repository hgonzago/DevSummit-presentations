var view;
require(["esri/Map", "esri/views/MapView"], function (
  Map,
  MapView
) {
  /******************************************************************
   *
   * Set the initial map and zoom/center example
   *
   ******************************************************************/

  // Create a basemap and set properties in map constructor. Try changing to various basemaps
  // streets, satellite, hybrid, topo, gray, dark-gray, oceans, national-geographic, terrain
  // osm, dark-gray-vector, gray-vector, streets-vector, topo-vector, streets-night-vector
  // streets-relief-vector, streets-navigation-vector

  var map = new Map({
    basemap: "gray-vector"
  });

  view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
      center: [-99.14725260912257, 36.48617178360141]
  });
});
