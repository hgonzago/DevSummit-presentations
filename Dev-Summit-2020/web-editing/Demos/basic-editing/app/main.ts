import WebMap = require("esri/WebMap");
import MapView = require("esri/views/MapView");
import Editor = require("esri/widgets/Editor");

// Create a map from the referenced web map item id
const webmap = new WebMap({
  portalItem: {
    id: "154ba34201774bb29f7c3b68adf52b6a"
  }
});

const view = new MapView({
  container: "viewDiv",
  map: webmap,
  popup: {
    autoOpenEnabled: false //disable popups
  }
});

// Create the Editor 💥
const editor = new Editor({ view });

view.ui.add(editor, "top-right");
