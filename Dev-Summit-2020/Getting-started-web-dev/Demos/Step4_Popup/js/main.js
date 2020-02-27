var view;
require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/PopupTemplate"
], function(Map, FeatureLayer, MapView, PopupTemplate) {
  // var defaultSym = {
  //   type: "simple-fill", // autocasts as new SimpleFillSymbol
  //   outline: {
  //     // autocasts as new SimpleLineSymbol
  //     color: "#a3acd1",
  //     width: 0.5
  //   }
  // };

  // /******************************************************************
  //  *
  //  * LayerRenderer example
  //  *
  //  ******************************************************************/

  // var renderer = {
  //   type: "simple", // autocasts as new SimpleRenderer
  //   symbol: defaultSym,
  //   label: "Private school enrollment ratio",
  //   visualVariables: [
  //     {
  //       type: "color",
  //       field: "PrivateEnr",
  //       stops: [
  //         {
  //           value: 0.044,
  //           color: "#edf8fb",
  //           label: "< 0.044"
  //         },
  //         {
  //           value: 0.059,
  //           color: "#b3cde3"
  //         },
  //         {
  //           value: 0.0748,
  //           color: "#8c96c6",
  //           label: "0.0748"
  //         },
  //         {
  //           value: 0.0899,
  //           color: "#8856a7"
  //         },
  //         {
  //           value: 0.105,
  //           color: "#994c99",
  //           label: "> 0.105"
  //         }
  //       ]
  //     }
  //   ]
  // };

  // /***********************************
  //  *  Create renderer for centroids
  //  ************************************/

  // var centroidRenderer = {
  //   type: "simple", // autocasts as new SimpleRenderer
  //   symbol: {
  //     type: "picture-marker", // autocasts as new SimpleMarkerSymbol
  //     url: "http://static.arcgis.com/images/Symbols/Basic/BlueSphere.png",
  //     width: "26",
  //     height: "26"
  //   }
  // };

  /******************************************************************
   *
   * Popup example
   *
   ******************************************************************/

  // Step 1: Create the template
  var popupTemplate = new PopupTemplate({
    title: "Crime in Tract {NAME}",
    content: [
      {
        // Specify the type of popup element - fields
        //fieldInfos autocasts
        type: "fields",
        fieldInfos: [
          {
            fieldName: "CrimeCnt",
            visible: true,
            label: "Number of crimes: "
          },
          {
            fieldName: "NarcoticsCnt",
            visible: true,
            label: "Number of narcotics crimes: "
          },
        ]
      },
      {
        type: "media",
        // mediainfos autocasts
        mediaInfos: [
          {
            title: "Chicago Crime and Narcotics Rates",
            type: "column-chart",
            caption: "Crime rate in comparison to narcotics rate",
            value: {
              theme: "Julie",
              fields: ["CrimeRate", "NarcoticsRate"],
            }
          }
        ]
      }
    ]
  });

  /******************************************************************
   *
   * Create feature layers
   *
   ******************************************************************/

  var chicagoCrime = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ChicagoCrime/FeatureServer/1",
    popupTemplate: popupTemplate
  });

  var vehicleThefts = new FeatureLayer({
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/ChicagoCrime/FeatureServer/0"
  });

  // Set map's basemap
  var map = new Map({
    basemap: "gray-vector",
    // layers: [chicagoCrime, vehicleThefts]
    layers: [chicagoCrime]
  });

  view = new MapView({
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
