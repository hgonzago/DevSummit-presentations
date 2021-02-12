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

  /**
   * We decided to comment out the apiKey in the demos, so anyone can view the demos directly
   * from the github repository. Since this API key will be deleted, the demos will not
   * work directly from github.
   * For this reason we are commenting out the apiKey and apiKey basemap, and replacing
   * it with a basemap that does not require an apiKey as demonstrated in the presentation.
   */

  // Setting the API key
  //esriConfig.apiKey = "AAPK15bd34036fd445f0850f84ca52294aceBwailxyLCOIIgPnh8xOql3-POkdaSbXdkHoFmcCCRFbf7X1m5QcqSizaK-6GdanK";

  const map = new Map({
    //basemap: "arcgis-dark-gray" // this basemap needs an API key
    basemap: "dark-gray" // this basemap does not need an API key
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