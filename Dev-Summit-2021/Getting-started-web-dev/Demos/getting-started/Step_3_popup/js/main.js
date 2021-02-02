/**
 * This step adds a PopupTemplate to the FeatureLayer. This app utilizes
 * Arcade to display Website content on the popup depending on the attribute
 * value. If there is no Website values in the feature, the Arcade expression
 * will return "There is no website available".
**/
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function (esriConfig, Map, MapView, FeatureLayer) {

  esriConfig.apiKey = "AAPK21ee2233694d49269b1f77bf7532ced66L8NhNDc6S06XPohlYgAn-QJeCVuJF1EMwVbV0iqzs9vNEWuDmQ2oK-DYbk8gBbl";

  // Data courtesy of BGMAPP
  const url =
    "https://services9.arcgis.com/q5uyFfTZo3LFL04P/arcgis/rest/services/survey123_0954ef4c3eb74d9989a91330c7740a9f/FeatureServer/0";

  // PopupTemplate with some Arcade to check if the feature has
  // a website field value or not.
  const template = {
    title: "{Name}",
    content: `<b>Address:</b> {Address}<br/>
      <b>Industry:</b> {Industry}<br/>
      <b>{expression/has-website}</b> <a href={expression/website-expr}>{expression/website-expr}</a>
      `,
    expressionInfos: [{
      name: 'website-expr',
      expression: `IIF(!IsEmpty($feature.Website), $feature.Website, null)`
    }, {
      name: 'has-website',
      expression: `IIf(!IsEmpty($feature.Website), "Website: ", "No website found for this business")`
    }]
  };

  // Initializing the FeatureLayer
  const featureLayer = new FeatureLayer({
    title: "Black-owned Businesses",
    url: url,
    copyright: "BGMAPP",
    popupTemplate: template
  });

  const map = new Map({
    basemap: "arcgis-dark-gray",
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