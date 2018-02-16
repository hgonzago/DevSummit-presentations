require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "esri/renderers/UniqueValueRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
], function (Map, FeatureLayer, MapView, UniqueValueRenderer, SimpleMarkerSymbol) {

  /******************************************************************
   *
   * LayerRenderer example
   *
   ******************************************************************/

  // Step 1: Create individual symbols to represent each unique value

  // Symbol for restaurants within 1/2 mile of convention center
  var halfMileSymbol = new SimpleMarkerSymbol({
    size: 14,
    color: "#ff3323",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });

  // Symbol for restaurants within 3/4 mile of convention center
  var threeQuarterMileSymbol = new SimpleMarkerSymbol({
    size: 14,
    color: "#ff9222",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });

  // Symbol for restaurants within 1 mile of convention center
  var oneMileSymbol = new SimpleMarkerSymbol({
    size: 14,
    color: "#00c725",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });

  // Symbol for restaurants within 1 1/4 miles of convention center
  var oneQuarterMileSymbol = new SimpleMarkerSymbol({
    size: 14,
    color: "#0084d8",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });

  // Symbol for restaurants within 2 miles of convention center
  var twoMileSymbol = new SimpleMarkerSymbol({
    size: 14,
    color: "#e113e8",
    width: 7,
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    }
  });
  /******************************************************************
     *
     * Set each unique value directly in the renderer's constructor.
     * At least one field must be used (in this case the "default" field).
     * Good sample to check out,
     * https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html

     *
     ******************************************************************/

  var foodRenderer = new UniqueValueRenderer({
    defaultSymbol: halfMileSymbol,
    defaultLabel: "Within 1/2 mile of convention center",
    field: "Proximity",
    uniqueValueInfos: [{
      value: "0.5", //attribute value for features within 1/2 mile of CC
      symbol: halfMileSymbol,
      label: "Within 1/2 mile of convention center"
        }, {
      value: "0.75", //attribute value for features within 3/4 mile of CC
      symbol: threeQuarterMileSymbol,
      label: "Within 3/4 mile of convention center"
        }, {
      value: "1", //attribute value for features within 1 mile of CC
      symbol: oneMileSymbol,
      label: "Within 1 mile of convention center"
        }, {
      value: "1.25", //attribute value for features within 1 1/4 miles of CC
      symbol: oneQuarterMileSymbol,
      label: "Within 1 1/4 miles of convention center"
        }, {
      value: "2", //attribute value for features within 2 miles of CC
      symbol: twoMileSymbol, 
      label: "Within 2 miles of convention center"
        }]
  });

  var foodLayer = new FeatureLayer({
    //food
    url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Restaurant_locations/FeatureServer/0",

    // set the renderer
    renderer: foodRenderer
  });

  var hoods = new FeatureLayer({
    //Create Neighborhoods layer and set opacity on it
    url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Neighborhoods/FeatureServer/0",
    opacity: 0.50
  });


  // Step 3: Pass in an array of layers to the map's constructor
  var map = new Map({
    basemap: "streets-vector",
    layers: [hoods, foodLayer]
  });

  // Step 4: Create the View and assign a container 'div' and pass in the map from above. Optionally, specify zoom/center
  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15,
    center: [-116.5403668778997, 33.82106252508553]
  });
});