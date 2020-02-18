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
  MapView,
  WebMap,
  Search,
  LayerSearchSource,
  Graphic,
  GraphicsLayer,
  PictureMarkerSymbol
) {
  // Module Order: Webmap and Map view are flipped 
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

  // Make sure that the view/map is fully available
  view.when(function () {
    // Uncomment for try/catch
    try {
      const layer = view.map.findLayerById("NGA_ASAM_1246");
      // TYPO: Mispell the class name for LayerSearchSource 
      // NETWORK: display field points to field with no info
      // inspect the network request to figure this out and 
      // find a better option
      const searchSource = new LayreSearchSource({
        layer: layer,
        displayField: "Descript",
        searchFields: ["Desc1", "Desc2", "Desc3", "Desc4"],
        name: "Nautical Piracy",
        placeholder: "Search incident details",
        withinViewEnabled: true
      });

      // CSS: we'll change the color of the search placeholder 
      // text so it 'pops'
      // CONSOLE: when run over http not on localhost 
      // you'll see a console message about geolocation 
      // requiring https
      const search = new Search({
        view: view,
        sources: [searchSource],
        includeDefaultSources: false,
        goToOverride: function (view, goToParams) {
          goToParams.target.zoom = 12;
          return view.goTo(goToParams.target, goToParams.options);
        }
      });
      view.ui.add(search, "top-trailing");

      search.on("search-clear", function () {
        graphicsLayer.removeAll();
      });

      // SECURITY: use a symbol with http BUT notice how it automatically adjusts this to read https, so there are no mixed content issues.
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

      //  Uncomment for try/catch
    } catch (error) {
      console.error(error);
    }

  });

});