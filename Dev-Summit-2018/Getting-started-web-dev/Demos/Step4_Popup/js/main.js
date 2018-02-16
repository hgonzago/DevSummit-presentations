require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "esri/renderers/UniqueValueRenderer",
    "esri/PopupTemplate",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
], function (Map, FeatureLayer, MapView, UniqueValueRenderer, PopupTemplate, SimpleMarkerSymbol) {

  /******************************************************************
   *
   * LayerRenderer example
   *
   ******************************************************************/

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

  // Set symbols on the renderer

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

  /******************************************************************
   *
   * Popup example
   *
   ******************************************************************/

  // Step 1: Create the template
  var popupTemplate = new PopupTemplate({
    title: "<b>Restaurant: {Title}</b>",
    // Step 2: Specify the first type of popup element to display
    content: [{
        // Step 3: Specify the second type of popup element - fields
        type: "fields",
        fieldInfos: [{
          fieldName: "Address",
          visible: true,
          label: "Address: "
                    }, {
          fieldName: "Hours",
          visible: true,
          label: "Hours of operation: "
                    }, {
          fieldName: "Short_Desc",
          visible: true,
          label: "Description: "
                    }, {
          fieldName: "Website",
          visible: true,
          label: "Website: "
                    }]
                },
      {
        type: "media",
        mediaInfos: [{
          type: "image",
          value: {
            sourceURL: "{Image_URL}"
          }
        }]
    }
            ]
  });

  // Set restaurants layer and set renderer on it
  var foodLayer = new FeatureLayer({
    //food
    url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Restaurant_locations/FeatureServer/0",

    // set the renderer
    renderer: foodRenderer,

    // Step 4: Specify the outfields for the featurelayer in addition to passing in the template created above
    outFields: ["*"],
    popupTemplate: popupTemplate
  });

  var hoods = new FeatureLayer({
    //Neighborhoods
    url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Neighborhoods/FeatureServer/0",
    opacity: 0.50
  });

  var map = new Map({
    basemap: "streets-vector",
    layers: [hoods, foodLayer]
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15,
    center: [-116.5403668778997, 33.82106252508553],

    //Step 5: Set the popup property in the MapView so that docking is enabled
    // and dockoptions are set. In this case, the popup can be docked to the
    //bottom right of the application.
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: true,
        position: "upper-right"
      }
    }
  });
});