define(["esri/WebMap", "esri/views/MapView", "esri/widgets/Search", "esri/widgets/Search/LayerSearchSource", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/symbols/PictureMarkerSymbol"], function (_WebMap, _MapView, _Search, _LayerSearchSource, _Graphic, _GraphicsLayer, _PictureMarkerSymbol) {
  "use strict";

  _WebMap = _interopRequireDefault(_WebMap);
  _MapView = _interopRequireDefault(_MapView);
  _Search = _interopRequireDefault(_Search);
  _LayerSearchSource = _interopRequireDefault(_LayerSearchSource);
  _Graphic = _interopRequireDefault(_Graphic);
  _GraphicsLayer = _interopRequireDefault(_GraphicsLayer);
  _PictureMarkerSymbol = _interopRequireDefault(_PictureMarkerSymbol);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var map = new _WebMap["default"]({
    portalItem: {
      id: "26d53be3e3f14f559c729d40a04f4b35"
    }
  });
  var graphicsLayer = new _GraphicsLayer["default"]();
  map.add(graphicsLayer);
  var view = new _MapView["default"]({
    map: map,
    container: "viewDiv"
  });
  setupSearch();

  function setupSearch() {
    return _setupSearch.apply(this, arguments);
  }

  function _setupSearch() {
    _setupSearch = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var layer, searchSource, search, pms;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return view.when();

            case 2:
              layer = view.map.findLayerById("NGA_ASAM_1246");
              searchSource = new _LayerSearchSource["default"]({
                layer: layer,
                displayField: "Desc1",
                searchFields: ["Desc1", "Desc2", "Desc3", "Desc4"],
                name: "Nautical Piracy",
                placeholder: "Search incident details",
                withinViewEnabled: true
              });
              search = new _Search["default"]({
                view: view,
                sources: [searchSource],
                includeDefaultSources: false,
                goToOverride: function goToOverride(view, goToParams) {
                  goToParams.target.zoom = 12;
                  return view.goTo(goToParams.target, goToParams.options);
                }
              });
              view.ui.add(search, "top-trailing");
              pms = new _PictureMarkerSymbol["default"]({
                url: "https://hgonzago.esri.com/sites/webinar/js-demo2copy/resources/pirate.png",
                height: 20,
                width: 20
              });
              search.on("search-clear", function () {
                graphicsLayer.removeAll();
              });
              search.on("select-result", function (event) {
                if (event.result) {
                  var graphic = new _Graphic["default"](event.result.feature.geometry, pms);
                  graphicsLayer.add(graphic);
                }
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _setupSearch.apply(this, arguments);
  }
});