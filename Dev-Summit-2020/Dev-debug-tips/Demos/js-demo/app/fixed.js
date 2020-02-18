require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/widgets/Search/LayerSearchSource",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/symbols/PictureMarkerSymbol",
  "dojo/domReady!"
], function (
  WebMap,
  MapView,
  Search,
  LayerSearchSource,
  Graphic,
  GraphicsLayer,
  PictureMarkerSymbol
) {

  const map = new WebMap({
    portalItem: {
      id: "26d53be3e3f14f559c729d40a04f4b35"
    }
  });

  const graphicsLayer = new GraphicsLayer();
  map.add(graphicsLayer);

  const view = new MapView({
    map: map,
    container: "viewDiv"
  });

  // Make sure that the view/map is fully available in order to get the layer from the map
  view.when(function () {
    const layer = view.map.findLayerById("NGA_ASAM_1246");

    const searchSource = new LayerSearchSource({
      layer: layer,
      displayField: "Desc1",
      searchFields: ["Desc1", "Desc2", "Desc3", "Desc4"],
      name: "Nautical Piracy",
      placeholder: "Search incident details",

      withinViewEnabled: true
    });

    const search = new Search({
      view: view,
      sources: [searchSource],
      includeDefaultSources: false,
      goToOverride: function (view, goToParams) {
        goToParams.target.zoom = 12;
        return view.goTo(goToParams.target,
          goToParams.options);
      }
    });


    view.ui.add(search, "top-trailing");

    search.on("search-clear", function () {
      graphicsLayer.removeAll();
    });

    const pms = new PictureMarkerSymbol({
      url: "https://hgonzago.esri.com/sites/webinar/js-demo2copy/resources/pirate.png",
      height: 20,
      width: 20
    });

    search.on("select-result", function (event) {
      if (event.result) {
        const graphic = new Graphic(event.result.feature.geometry, pms)
        graphicsLayer.add(graphic);
      }
    });

  });
});
