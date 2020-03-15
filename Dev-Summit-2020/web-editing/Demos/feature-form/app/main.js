define(["require", "exports", "esri/layers/FeatureLayer", "esri/widgets/FeatureForm", "esri/views/MapView", "esri/Map", "esri/core/watchUtils"], function (require, exports, FeatureLayer, FeatureForm, MapView, Map, watchUtils_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var highlight;
    var editFeature;
    var updateContainer = document.getElementById("update");
    var updateButton = document.getElementById("btnUpdate");
    //----------------------------------
    //  set up map
    //----------------------------------
    var featureLayer = new FeatureLayer({
        portalItem: {
            id: "d66f506b84d84512b4f9e7e6ca820116"
        }
    });
    var map = new Map({
        basemap: "dark-gray",
        layers: [featureLayer]
    });
    var view = new MapView({
        map: map,
        container: "viewDiv",
        center: [-79.681652, 43.441544],
        zoom: 12
    });
    // disable popup
    view.popup.autoOpenEnabled = false;
    view.on("click", function (event) {
        unselectFeature();
        // check if click has features underneath
        view.hitTest(event).then(function (hitTest) {
            var first = hitTest.results[0];
            if (first) {
                selectFeature(first.graphic.attributes[featureLayer.objectIdField]);
                return;
            }
            updateContainer.classList.add("esri-hidden");
        });
    });
    function selectFeature(objectId) {
        featureLayer
            .queryFeatures({
            objectIds: [objectId],
            outFields: ["*"]
        })
            .then(function (_a) {
            var features = _a.features;
            if (features.length === 0) {
                return;
            }
            editFeature = features[0];
            // display the attributes of selected feature in the form
            form.feature = editFeature;
            // highlight selected feature
            view
                .whenLayerView(editFeature.layer)
                .then(function (layerView) {
                highlight = layerView.highlight(editFeature);
            });
            // show form
            updateContainer.classList.remove("esri-hidden");
        });
    }
    function unselectFeature() {
        if (highlight) {
            highlight.remove();
        }
    }
    function selectFirstOnLoad() {
        view
            .whenLayerView(featureLayer)
            .then(function (lv) {
            return watchUtils_1.whenFalseOnce(lv, "updating", function () {
                return lv
                    .queryFeatures({ geometry: view.extent })
                    .then(function (_a) {
                    var features = _a.features;
                    return selectFeature(features[0].attributes[featureLayer.objectIdField]);
                });
            });
        });
    }
    //----------------------------------
    //  set up form
    //----------------------------------
    var form = new FeatureForm({
        container: "form"
    });
    // Listen to the feature form's submit event.
    form.on("submit", function () {
        if (!editFeature) {
            return;
        }
        editFeature.attributes = form.getValues();
        applyAttributeUpdates(editFeature);
    });
    //----------------------------------
    //  set up form submit
    //----------------------------------
    updateButton.onclick = function () {
        // fires feature form's submit event.
        form.submit();
    };
    // call FeatureLayer.applyEdits()
    function applyAttributeUpdates(updatedFeature) {
        updateButton.style.cursor = "progress";
        featureLayer
            .applyEdits({ updateFeatures: [updatedFeature] })
            .then(function (_a) {
            var updateFeatureResults = _a.updateFeatureResults;
            var first = updateFeatureResults[0];
            if (first) {
                selectFeature(first.objectId);
            }
            updateButton.style.cursor = "pointer";
        })
            .catch(function (error) {
            console.error("===============================================\n        [ applyEdits ] FAILURE: " + error);
            updateButton.style.cursor = "pointer";
        });
    }
    selectFirstOnLoad();
    view.ui.add("update", "top-right");
});
