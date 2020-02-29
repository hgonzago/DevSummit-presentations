require([
    "esri/WebMap",
    "esri/views/MapView"
], function (WebMap, MapView) {

  /******************************************************************
   *
   * Webmap example
   *
   ******************************************************************/

  // Step 1: Pass a webmap instance to the map and specify the id for the webmap item
  const map = new WebMap({
    portalItem: { // autocast (no need to specifically require it above)
      id: "f9a9a7e3857d4d51b2c801cf8c399add"
    }
  });

  const view = new MapView({
    container: "viewDiv",
    // Step 2: Set the view's map to that of the specified webmap above
    map: map
    // zoom: 3,
    // center: [-99.14725260912257, 36.48617178360141]
  });

});
