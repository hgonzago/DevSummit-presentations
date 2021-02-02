/**
 * This first step illustrates how to add a Map to your application.
 * This app demonstrates how to add one of the new basemaps to use with
 * an API key using the 'esri/config' module. The APK key is obtained from
 * the ArcGIS Developers site in your dashboard: https://developers.arcgis.com/dashboard/
 **/
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView"
], function (esriConfig, Map, MapView) {

  // Setting the API key
  esriConfig.apiKey = "AAPK21ee2233694d49269b1f77bf7532ced66L8NhNDc6S06XPohlYgAn-QJeCVuJF1EMwVbV0iqzs9vNEWuDmQ2oK-DYbk8gBbl";

  const map = new Map({
    basemap: "arcgis-dark-gray"
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