define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Editor"], function (require, exports, WebMap, MapView, Editor) {
    Object.defineProperty(exports, "__esModule", { value: true });
    // Create a map from the referenced web map item id
    var webmap = new WebMap({
        portalItem: {
            id: "154ba34201774bb29f7c3b68adf52b6a"
        }
    });
    var view = new MapView({
        container: "viewDiv",
        map: webmap,
        popup: {
            autoOpenEnabled: false //disable popups
        }
    });
    // Create the Editor 💥
    var editor = new Editor({ view: view });
    view.ui.add(editor, "top-right");
});
