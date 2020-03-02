require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/PopupTemplate"
], function (Map, FeatureLayer, MapView, PopupTemplate) {

  /******************************************************************
   *
   * LayerRenderer example
   *
   ******************************************************************/

  /***********************************************************************
   * Set the visual variables.
   *
   * Here we define two visual variables - color and size.
   * The color visual variable will use color to show the
   * crime counts per tract. A dark
   * purple color shows areas of higher amounts of crime. The pale yellow 
   * areas show areas with a smaller amount of crime.
   ***********************************************************************/

  const colorVisVar = {
    "type": "color",
    "field": "CrimeCnt",
    "valueExpression": null,
    "stops": [{
        "value": 0,
        "color": [
          255,
          252,
          212,
          255
        ],
        "label": "< 0"
      },
      {
        "value": 25,
        "color": [
          224,
          178,
          193,
          255
        ],
        "label": null
      },
      {
        "value": 50.8,
        "color": [
          193,
          104,
          173,
          255
        ],
        "label": "50.8"
      },
      {
        "value": 75.9,
        "color": [
          123,
          53,
          120,
          255
        ],
        "label": null
      },
      {
        "value": 101,
        "color": [
          53,
          2,
          66,
          255
        ],
        "label": "> 101"
      }
    ]
  };

  /***********************************************************************
   * The size visual variable will be defined based on the narcotic counts
   * within this tract.
   ***********************************************************************/

  const sizeVisVar = {
    "type": "size",
    "field": "NarcoticsC",
    "valueExpression": null,
    "valueUnit": "unknown",
    "minSize": {
      "type": "size",
      "valueExpression": "$view.scale",
      "stops": [{
          "value": 1128,
          "size": 12
        },
        {
          "value": 2256,
          "size": 12
        },
        {
          "value": 288896,
          "size": 3
        },
        {
          "value": 2311162,
          "size": 3
        },
        {
          "value": 97989703,
          "size": 1.5
        }
      ]
    },
    "maxSize": {
      "type": "size",
      "valueExpression": "$view.scale",
      "stops": [{
          "value": 1128,
          "size": 60
        },
        {
          "value": 2256,
          "size": 60
        },
        {
          "value": 288896,
          "size": 37.5
        },
        {
          "value": 2311162,
          "size": 37.5
        },
        {
          "value": 97989703,
          "size": 18.75
        }
      ]
    },
    "minDataValue": 0,
    "maxDataValue": 378
  };

  /***********************************************************************
   * Define a simple renderer and set the visual variables.
   *
   * Even though the features in this layer are polygons, we will use a
   * SimpleMarkerSymbol to symbolize them. This will allow us to use the
   * size visual variable in the renderer.
   ***********************************************************************/

  const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    // Define a default marker symbol with a small outline
    symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [128, 128, 128],
        width: 0.5
      }
    },
    label: "test",
    // Set the color and size visual variables on the renderer
    visualVariables: [colorVisVar, sizeVisVar]
  };


  /******************************************************************
   *
   * Popup example
   *
   ******************************************************************/

  // Step 1: Create the template
  const popupTemplate = new PopupTemplate({
    title: "Crime in Tract {NAME}",
    content: [{
        // Specify the type of popup element - fields
        //fieldInfos autocasts
        type: "fields",
        fieldInfos: [{
            fieldName: "CrimeCnt",
            visible: true,
            label: "Number of crimes: "
          },
          {
            fieldName: "NarcoticsC",
            visible: true,
            label: "Number of narcotics crimes: "
          },
        ]
      },
      {
        type: "media",
        // mediainfos autocasts
        mediaInfos: [{
          title: "Chicago Crime and Narcotics Rates",
          type: "column-chart",
          caption: "Crime rate in comparison to narcotics rate",
          value: {
            theme: "Julie",
            fields: ["CrimeRate", "NarcoticsR"],
          }
        }]
      }
    ]
  });

  /******************************************************************
   *
   * Create feature layers
   *
   ******************************************************************/

  const chicagoCrime = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Chicago_Crime_Tracts/FeatureServer/0",
    popupTemplate: popupTemplate,
    outFields: ["*"],
    renderer: renderer
  });

  // const vehicleThefts = new FeatureLayer({
  //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ChicagoCrime/FeatureServer/0"
  // });

  // Set map's basemap
  const map = new Map({
    basemap: "gray-vector",
    // layers: [chicagoCrime, vehicleThefts]
    layers: [chicagoCrime]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 10,
    center: [-87.66453728281347, 41.840392306471315],
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false
      }
    }
  });
});