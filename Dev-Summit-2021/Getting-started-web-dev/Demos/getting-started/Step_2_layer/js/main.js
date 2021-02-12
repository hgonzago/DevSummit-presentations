/**
 * This step demonstrates how to add a FeatureLayer to your map. The data
 * in this layer was collected and created by Black Girls M.A.P.P (BGMAPP). 
 * To get more information about this organization, and to see some of the great
 * work being done by this organization, visit bgmapp.org.
**/
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function (esriConfig, Map, MapView, FeatureLayer) {

  //esriConfig.apiKey = "AAPK15bd34036fd445f0850f84ca52294aceBwailxyLCOIIgPnh8xOql3-POkdaSbXdkHoFmcCCRFbf7X1m5QcqSizaK-6GdanK";

  // Data courtesy of BGMAPP
  const url =
    "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/survey123_0954ef4c3eb74d9989a91330c7740a9f/FeatureServer/0";

  // Initializing the FeatureLayer
  const featureLayer = new FeatureLayer({
    title: "Black-owned Businesses",
    url: url,
    copyright: "BGMAPP"
  });

  const map = new Map({
    //basemap: "arcgis-dark-gray",
    basemap: "dark-gray",
    layers: [featureLayer]  // add the layer to the Map
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    extent: {
      xmin: -118.98364392089809,
      ymin: 33.64236255586565,
      xmax: -117.5073560791019,
      ymax: 34.4638389963474,
      spatialReference: 4326
    }
  });
  
});