require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/core/watchUtils",
    "esri/widgets/Legend",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!"
], function (WebMap, MapView, watchUtils, Legend, domConstruct, on, dom) {

  var map = new WebMap({
    portalItem: { // autocast
      id: "0f469011a580418e962de875e354fa9a"
    }
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 12,
    center: [-116.51131318985159, 33.82694510172852]
  });

  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/

  view.then(function () {
    var foodLayer = map.layers.getItemAt(1);
    // Step 1: Create the widget
    var legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [{
        layer: foodLayer,
        title: "Palm Springs restaurants"
      }]
    });
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-left");
  });
});