require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Swipe",
], function(WebMap, MapView, Legend, Swipe) {

  var map = new WebMap({
    portalItem: {
      // autocast
      id: "f9a9a7e3857d4d51b2c801cf8c399add"
    }
  });
  var view = new MapView({
    container: "viewDiv",
    map: map
  });
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/
  view.when(function() {
    var chicagoCrime = map.layers.getItemAt(0);
    var vehicles = map.layers.getItemAt(1);
    vehicles.visible = true;
    // Step 1: Create the widget
    var legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [
        {
          layer: chicagoCrime,
          title: "Chicago Crime Tracts"
        },
        {
          layer: vehicles,
          title: "Vehicle Thefts"
        }
      ]
    });

    var swipe = new Swipe({
      view: view,
      leadingLayers: [chicagoCrime],
      trailingLayers: [vehicles],
      position: 45
    });
    
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "top-right");
    view.ui.add(swipe);

  });
});
