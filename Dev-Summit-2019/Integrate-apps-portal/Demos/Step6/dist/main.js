define(["esri/WebMap", "esri/views/SceneView", "esri/portal/Portal", "esri/identity/OAuthInfo", "esri/identity/IdentityManager", "esri/layers/Layer", "esri/widgets/Expand", "esri/widgets/BasemapGallery", "esri/widgets/Search"], function (_WebMap, _SceneView, _Portal, _OAuthInfo, _IdentityManager, _Layer, _Expand, _BasemapGallery, _Search) {
  "use strict";

  _WebMap = _interopRequireDefault(_WebMap);
  _SceneView = _interopRequireDefault(_SceneView);
  _Portal = _interopRequireDefault(_Portal);
  _OAuthInfo = _interopRequireDefault(_OAuthInfo);
  _IdentityManager = _interopRequireDefault(_IdentityManager);
  _Layer = _interopRequireDefault(_Layer);
  _Expand = _interopRequireDefault(_Expand);
  _BasemapGallery = _interopRequireDefault(_BasemapGallery);
  _Search = _interopRequireDefault(_Search);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  handleAuthentication();
  var map = new _WebMap.default({
    portalItem: {
      id: "7761d81ff08e45f2a7f27997e8d3e92d"
    }
  });
  var view = new _SceneView.default({
    map: map,
    zoom: 4,
    center: [-98, 35],
    container: "viewDiv"
  });
  var portalUrl = "https://www.arcgis.com/sharing";
  view.when(function () {
    _IdentityManager.default.checkSignInStatus(portalUrl).always(function (info) {
      var user = info && info.userId ? info.userId : null;

      if (user) {
        getCredentials(info);
      } else {
        loadPortal(user);
      }
    });
  });

  function loadPortal(_x) {
    return _loadPortal.apply(this, arguments);
  }

  function _loadPortal() {
    _loadPortal = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(user) {
      var portal, layerTypes, query, itemResults;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              portal = new _Portal.default();
              _context.next = 3;
              return portal.load();

            case 3:
              document.getElementById("title").innerHTML = "Explore ".concat(portal.name ? portal.name : "Portal");
              addWidgets(portal); // Get a few items from the default portal or get a few
              // items from logged in user and display as thumbnails in side panel

              layerTypes = '(type:("Feature Collection" OR "Feature Service" OR "Map Service" ) -typekeywords:"Table")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" -type:"Map Area" -typekeywords:"MapAreaPackage"';
              query = user ? "owner:".concat(user, " ").concat(layerTypes) : layerTypes;
              _context.next = 9;
              return portal.queryItems({
                extent: view.extent,
                query: query
              });

            case 9:
              itemResults = _context.sent;
              // Step 4b: Deal with results
              displayItems(itemResults.results);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _loadPortal.apply(this, arguments);
  }

  function addWidgets(portal) {
    var group = "top-right"; // Step 6 add widgets and additional functionality

    var search = new _Search.default({
      view: view,
      portal: portal
    });
    view.ui.add(new _Expand.default({
      content: search,
      view: view,
      group: group
    }), group);
    var basemapGallery = new _BasemapGallery.default({
      view: view,
      source: portal
    });
    view.ui.add(new _Expand.default({
      content: basemapGallery,
      view: view,
      group: group
    }), group);
  }

  function displayItems(items) {
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "\n    ".concat(items.map(function (item) {
      return "<div class=\"card leader-1\">\n  <figure class=\"card-image-wrap\">\n    <img class=\"card-image\" src=".concat(item.thumbnailUrl, " alt/>\n  </figure>\n  <div class=\"card-content\">\n    <h5 >").concat(item.title, "</h5>\n    <button data-item=").concat(item.id, " class=\"add-btn btn btn-fill\">Add to Map</button>\n  </div>\n</div>");
    }).join(""));
    Array.from(document.getElementsByClassName("add-btn")).forEach(function (element) {
      element.addEventListener("click", function () {
        return addLayerToMap({
          id: element.getAttribute("data-item")
        });
      });
    });
  }

  function addLayerToMap(_x2) {
    return _addLayerToMap.apply(this, arguments);
  }

  function _addLayerToMap() {
    _addLayerToMap = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(item) {
      var layer;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _Layer.default.fromPortalItem(item);

            case 2:
              layer = _context2.sent;
              layer.watch("loadStatus", function (status) {
                if (status === "loaded") {
                  view.goTo(layer.fullExtent);
                }
              });
              view.map.add(layer);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _addLayerToMap.apply(this, arguments);
  }

  function handleAuthentication() {
    // Switch sign in / sign out links
    var signInButton = document.getElementById("signIn");
    var signOutButton = document.getElementById("signOut");

    _IdentityManager.default.registerOAuthInfos([new _OAuthInfo.default({
      appId: "b3S1dvKs0rI5WJuU"
    })]);

    signInButton.addEventListener("click", function () {
      getCredentials();
    });
    signOutButton.addEventListener("click", function () {
      destroyCredentials();
    });
  }

  function getCredentials() {
    return _getCredentials.apply(this, arguments);
  }

  function _getCredentials() {
    _getCredentials = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var credential,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              credential = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
              document.getElementById("signInNav").classList.add("hide");
              document.getElementById("userNav").classList.remove("hide");

              if (credential) {
                _context3.next = 7;
                break;
              }

              _context3.next = 6;
              return _IdentityManager.default.getCredential(portalUrl);

            case 6:
              credential = _context3.sent;

            case 7:
              loadPortal(credential.userId);
              document.getElementById("userName").innerHTML = credential.userId;

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _getCredentials.apply(this, arguments);
  }

  function destroyCredentials() {
    _IdentityManager.default.destroyCredentials();

    window.location.reload();
  }
});