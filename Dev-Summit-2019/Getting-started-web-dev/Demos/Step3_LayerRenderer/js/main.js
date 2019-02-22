var view;
require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView"
], function(Map, FeatureLayer, MapView) {
  var defaultSym = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "#a3acd1",
      width: 0.5
    }
  };

  /******************************************************************
   *
   * LayerRenderer example
   *
   ******************************************************************/

  // Step 1: Create individual symbols to represent each unique value

  var renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: defaultSym,
    label: "Private school enrollment ratio",
    visualVariables: [
      {
        type: "color",
        field: "PrivateEnr",
        stops: [
          {
            value: 0.044,
            color: "#edf8fb",
            label: "< 0.044"
          },
          {
            value: 0.059,
            color: "#b3cde3"
          },
          {
            value: 0.0748,
            color: "#8c96c6",
            label: "0.0748"
          },
          {
            value: 0.0899,
            color: "#8856a7"
          },
          {
            value: 0.105,
            color: "#994c99",
            label: "> 0.105"
          }
        ]
      }
    ]
  };

  /***********************************
   *  Create renderer for centroids
   ************************************/

  var centroidRenderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
      url: "http://static.arcgis.com/images/Symbols/Basic/BlueSphere.png",
      width: "26",
      height: "26"
    }
  };

  /******************************************************************
   *
   * Create feature layers
   *
   ******************************************************************/

  var privateSchoolsPoint = new FeatureLayer({
    // Private Schools centroids
    url:
      "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Centroids/FeatureServer/0",
    renderer: centroidRenderer
  });

  var privateSchoolsPoly = new FeatureLayer({
    // Private schools per state
    // layer with rendering
    // url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/OverlaySchools/FeatureServer/0"
    // layer without rendering
    url:
      "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/PrivateSchoolEnrollmentNoRendering/FeatureServer/0",
    outFields: ["*"],
    opacity: 0.8,
    renderer: renderer
  });

  // Set map's basemap
  var map = new Map({
    basemap: "gray-vector"
  });

  view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
    center: [-99.14725260912257, 36.48617178360141]
  });

  view.when(function() {
    map.addMany([privateSchoolsPoly, privateSchoolsPoint]);
    // map.add(privateSchoolsPoly);
  });
});
