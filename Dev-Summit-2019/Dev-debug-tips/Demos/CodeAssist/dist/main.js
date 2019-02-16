define(["esri/views/MapView", "esri/Map"], function (_MapView, _Map) {
  "use strict";

  var _MapView2 = _interopRequireDefault(_MapView);

  var _Map2 = _interopRequireDefault(_Map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var map = new _Map2.default({
    basemap: "streets"
  });

  var view = new _MapView2.default({
    container: "viewDiv",
    map: map,
    zoom: 6,
    center: [15, 65]
  });
});