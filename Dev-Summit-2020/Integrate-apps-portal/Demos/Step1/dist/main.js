define(["esri/identity/OAuthInfo", "esri/identity/IdentityManager"], function (_OAuthInfo, _IdentityManager) {
  "use strict";

  _OAuthInfo = _interopRequireDefault(_OAuthInfo);
  _IdentityManager = _interopRequireDefault(_IdentityManager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }

  // Step 1 handle authentication
  handleAuthentication();
  var portalUrl = "https://www.arcgis.com/sharing"; // Step 1a: See if user is already signed-in
  // Registers a callback that will always be called when the promise's operation ended
  // no matter of its success. Pass in portalURL and it returns a promise with a credential.

  _IdentityManager.default.checkSignInStatus(portalUrl).then(function (info) {
    // If info(credential) is not null and has a userId than set user to info.userId otherwise
    // set the user to null
    var user = info && info.userId ? info.userId : null;

    if (user) {
      getCredentials(info);
    } else { // No one is logged in so we'll get anonymous content from portal
    }
  }, function (error) { // No one is logged in so get anonymous content
  });
  /* Handle Authentication
    Registers the app with Identity Manager
    Sets up click event handlers for sign-in and sign-out button
  
  */

  function handleAuthentication() {
    var signInButton = document.getElementById("signIn");
    var signOutButton = document.getElementById("signOut");

    _IdentityManager.default.registerOAuthInfos([new _OAuthInfo.default({
      appId: "Nrt2ESvH1cqQzSYa"
    })]);

    signInButton.addEventListener("click", function () {
      getCredentials();
    });
    signOutButton.addEventListener("click", function () {
      destroyCredentials();
    });
  }
  /* Get Credentials is called when user clicks the Sign in link.
     It switches from sign-in to sign out*/


  function getCredentials() {
    return _getCredentials.apply(this, arguments);
  }

  function _getCredentials() {
    _getCredentials = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var credential,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                credential = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
                // Toggle sign-in links (signin/signout)
                document.getElementById("signInNav").classList.add("hide");
                document.getElementById("userNav").classList.remove("hide");

                if (credential) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return _IdentityManager.default.getCredential(portalUrl);

              case 6:
                credential = _context.sent;

              case 7:
                // Update the sign-in link to include logged in users name
                document.getElementById("userName").innerHTML = credential.userId;

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
    return _getCredentials.apply(this, arguments);
  }

  function destroyCredentials() {
    // Sign Out
    _IdentityManager.default.destroyCredentials();
  }
});
