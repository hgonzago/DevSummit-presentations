define(["esri/WebMap", "esri/views/SceneView", "esri/identity/OAuthInfo", "esri/identity/IdentityManager"], function (_WebMap, _SceneView, _OAuthInfo, _IdentityManager) {
  "use strict";

  _WebMap = _interopRequireDefault(_WebMap);
  _SceneView = _interopRequireDefault(_SceneView);
  _OAuthInfo = _interopRequireDefault(_OAuthInfo);
  _IdentityManager = _interopRequireDefault(_IdentityManager);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  // Step 1 handle authentication
  handleAuthentication(); // Step 2 create simple 3d (or 2d map)

  var map = new _WebMap["default"]({
    portalItem: {
      id: "7761d81ff08e45f2a7f27997e8d3e92d"
    }
  });
  var view = new _SceneView["default"]({
    map: map,
    zoom: 4,
    center: [-98, 35],
    container: "viewDiv"
  });
  var portalUrl = "https://www.arcgis.com/sharing";
  view.when(function () {
    // Step 1a: See if user is already signed-in
    _IdentityManager["default"].checkSignInStatus(portalUrl).then(function (info) {
      // If user is logged-in update sign-in
      var user = info && info.userId ? info.userId : null;

      if (user) {
        getCredentials(info);
      }
    }, function (error) {// not logged in 
    });
  });

  function handleAuthentication() {
    var signInButton = document.getElementById("signIn");
    var signOutButton = document.getElementById("signOut");

    _IdentityManager["default"].registerOAuthInfos([new _OAuthInfo["default"]({
      appId: "Nrt2ESvH1cqQzSYa"
    })]);

    signInButton.addEventListener("click", function () {
      getCredentials();
    });
    signOutButton.addEventListener("click", function () {
      destroyCredentials();
    });
  }

  function getCredentials(_x) {
    return _getCredentials.apply(this, arguments);
  }

  function _getCredentials() {
    _getCredentials = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(credential) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // If the user isn't already logged-in use getCredential
              // to kick-off the login process
              document.getElementById("signInNav").classList.add("hide");
              document.getElementById("userNav").classList.remove("hide");

              if (credential) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return _IdentityManager["default"].getCredential(portalUrl);

            case 5:
              credential = _context.sent;

            case 6:
              document.getElementById("userName").innerHTML = credential.userId;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _getCredentials.apply(this, arguments);
  }

  function destroyCredentials() {
    _IdentityManager["default"].destroyCredentials();
  }
});