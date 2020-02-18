import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";
import LayerSearchSource from "esri/widgets/Search/LayerSearchSource";
import Graphic from "esri/Graphic";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import PictureMarkerSymbol from "esri/symbols/PictureMarkerSymbol";

const map = new WebMap({
  portalItem: {
    id: "26d53be3e3f14f559c729d40a04f4b35"
  }
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

const view = new MapView({
  map,
  container: "viewDiv"
});

setupSearch();
async function setupSearch() {

  await view.when();
  const layer = view.map.findLayerById("NGA_ASAM_1246");
  const searchSource = new LayerSearchSource({
    layer,
    displayField: "Desc1",
    searchFields: ["Desc1", "Desc2", "Desc3", "Desc4"],
    name: "Nautical Piracy",
    placeholder: "Search incident details",
    withinViewEnabled: true
  });
  const search = new Search({
    view,
    sources: [searchSource],
    includeDefaultSources: false,
    goToOverride: (view, goToParams) => {
      goToParams.target.zoom = 12;
      return view.goTo(goToParams.target, goToParams.options);
    }
  });

  view.ui.add(search, "top-trailing");

  const pms = new PictureMarkerSymbol({
    url: "https://hgonzago.esri.com/sites/webinar/js-demo2copy/resources/pirate.png",
    height: 20,
    width: 20
  });


  search.on("search-clear", () => {
    graphicsLayer.removeAll();
  });
  search.on("select-result", (event) => {
    if (event.result) {
      const graphic = new Graphic(event.result.feature.geometry, pms)
      graphicsLayer.add(graphic);
    }
  });

}
