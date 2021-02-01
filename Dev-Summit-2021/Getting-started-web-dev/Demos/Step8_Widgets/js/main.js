require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Swipe",
], function (WebMap, MapView, Legend, Swipe) {

  const map = new WebMap({
    portalItem: {
      // autocast
      id: "f9a9a7e3857d4d51b2c801cf8c399add"
    }
  });
  const view = new MapView({
    container: "viewDiv",
    map: map
  });
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/
  view.when(function () {
    const chicagoCrime = map.layers.getItemAt(0); // bottom
    const homicideLayer = map.layers.getItemAt(2); // top
    const vehicles = map.layers.getItemAt(1); // middle
    homicideLayer.visible = true;
    // Step 1: Create the widget
    const legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [{
          layer: chicagoCrime,
          title: "Chicago Crime Tracts"
        },
        {
          layer: homicideLayer,
          title: "Homicides"
          // layer: vehicles,
          // title: "Vehicle Thefts"
        }
      ]
    });

    const swipe = new Swipe({
      view: view,
      leadingLayers: [chicagoCrime],
      trailingLayers: [homicideLayer],
      position: 45
    });

    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "top-right");
    view.ui.add(swipe);

  });
});