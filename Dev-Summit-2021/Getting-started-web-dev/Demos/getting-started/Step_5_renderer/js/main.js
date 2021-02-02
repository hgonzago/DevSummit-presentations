/**
 * This step adds a UniqueValueRenderer to the FeatureLayer to better visualize
 * the data. The Legend widget will display labels and symbols for layers in the map.
 **/
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/widgets/Expand"
], function (esriConfig, Map, MapView, FeatureLayer, Legend, Expand) {

  esriConfig.apiKey = "AAPK21ee2233694d49269b1f77bf7532ced66L8NhNDc6S06XPohlYgAn-QJeCVuJF1EMwVbV0iqzs9vNEWuDmQ2oK-DYbk8gBbl";

  // Data courtesy of BGMAPP.org
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

   // Unique Value Renderer to apply on the FeatureLayer
  const uvrRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    field: "Industry",
    defaultSymbol: {
      type: "simple-marker",
      color: "#b2b2b2", // light-gray
      size: "10px"
    },
    uniqueValueInfos: [{
      value: "accessories_&_clothing",
      label: "Accessories & Clothing",  // labels will appear on the Legend widget
      symbol: {
        type: "simple-marker",
        color: "#d9351a",
        size: "10px"
      }
    },{
      value: "arts_&_culture",
      label: "Arts & Culture",
      symbol: {
        type: "simple-marker",
        color: "#ffc730",
        size: "10px"
      }
    }, {
      value: "auto",
      label: "Auto",
      symbol: {
        type: "simple-marker",
        color: "#144d59",
        size: "10px"
      }
    }, {
      value: "food_+_beverage",
      label: "Food + Beverage",
      symbol: {
        type: "simple-marker",
        color: "#2c6954",
        size: "10px"
      }
    }, {
      value: "hair_body_&_beauty",
      label: "Hair, Body & Beauty",
      symbol: {
        type: "simple-marker",
        color: "#ed9310",
        size: "10px"
      }
    }, {
      value: "health_&_medicine",
      label: "Health & Medicine",
      symbol: {
        type: "simple-marker",
        color: "#8c213f",
        size: "10px"
      }
    }, {
      value: "it_&_tech_hardware+software_",
      label: "IT & Tech",
      symbol: {
        type: "simple-marker",
        color: "#102432",
        size: "10px"
      }
    }, {
      value: "legal",
      label: "Legal",
      symbol: {
        type: "simple-marker",
        color: "#a64f1b",
        size: "10px"
      }
    }, {
      value: "management",
      label: "Management",
      symbol: {
        type: "simple-marker",
        color: "#18382e",
        size: "10px"
      }
    }, {
      value: "non_profit_organization",
      label: "Non Profit Organization",
      symbol: {
        type: "simple-marker",
        color: "#b31515",
        size: "10px"
      }
    }, {
      value: "religious",
      label: "Religious",
      symbol: {
        type: "simple-marker",
        color: "#4a0932",
        size: "10px"
      }
    }]
  };

  // Initializing the FeatureLayer
  const featureLayer = new FeatureLayer({
    title: "Black-owned Businesses",
    url: url,
    copyright: "BGMAPP",
    popupTemplate: template,
    renderer: uvrRenderer
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

  // Adding a Legend and Expand widget
  const legend = new Legend({
      view: view,
      container: "legendDiv"
  });

  const expand = new Expand({
      view: view,
      content: document.getElementById("infoDiv"),
      expanded: true
  });

  view.ui.add(expand, "top-right");

});