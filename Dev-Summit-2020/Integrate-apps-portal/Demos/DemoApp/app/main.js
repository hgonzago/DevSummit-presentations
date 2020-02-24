var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/WebMap", "esri/views/SceneView", "esri/portal/Portal", "esri/identity/OAuthInfo", "esri/identity/IdentityManager", "esri/layers/Layer", "esri/widgets/Expand", "esri/widgets/BasemapGallery", "esri/widgets/Search", "esri/core/promiseUtils"], function (require, exports, WebMap, SceneView, Portal, OAuthInfo, IdentityManager, Layer, Expand, BasemapGallery, Search, promiseUtils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    handleAuthentication();
    var view = new SceneView({
        map: new WebMap({ portalItem: { id: "7761d81ff08e45f2a7f27997e8d3e92d" } }),
        zoom: 4,
        center: [-98, 35],
        container: "viewDiv"
    });
    var portalUrl = "https://www.arcgis.com/sharing";
    view.when(function () {
        IdentityManager.checkSignInStatus(portalUrl).then(function (info) {
            // User is logged-in update sign-in button and query items
            var user = info && info.userId ? info.userId : null;
            if (user) {
                getCredentials(info);
            }
            else {
                queryItems(user);
            }
        }, function (error) {
            // No one logged in just query for public items 
            queryItems();
        });
    });
    function queryItems(user) {
        return __awaiter(this, void 0, void 0, function () {
            var portal, layerTypes, query, _a, itemResults, groupResults;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        portal = new Portal();
                        return [4 /*yield*/, portal.load()];
                    case 1:
                        _b.sent();
                        addWidgets(portal);
                        layerTypes = '(type:("Feature Collection" OR "Feature Service" OR "Map Service" ) -typekeywords:"Table")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" -type:"Map Area" -typekeywords:"MapAreaPackage"';
                        query = user ? "owner:" + user + " " + layerTypes : layerTypes;
                        return [4 /*yield*/, promiseUtils.eachAlways([
                                portal.queryItems({ extent: view.extent, query: query }),
                                portal.queryGroups({ query: "id:79648f2f03454cc5ba455555f8746257" })
                            ])];
                    case 2:
                        _a = _b.sent(), itemResults = _a[0], groupResults = _a[1];
                        displayItems(itemResults.value.results);
                        displayFeeds(groupResults.value.results);
                        return [2 /*return*/];
                }
            });
        });
    }
    function addWidgets(portal) {
        // Specify portal when creating basemap gallery and search to use portal content
        document.getElementById("title").innerHTML = "Explore " + (portal.name ? portal.name : 'Portal');
        var group = "top-right";
        var search = new Search({
            view: view,
            portal: portal
        });
        view.ui.add(new Expand({
            content: search,
            view: view,
            group: group
        }), group);
        var basemapGallery = new BasemapGallery({ view: view, source: portal });
        view.ui.add(new Expand({
            content: basemapGallery,
            view: view,
            group: group
        }), group);
    }
    function displayItems(items) {
        var cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML = "\n    " + items.map(function (item) { return "<div class=\"card leader-1\">\n  <figure class=\"card-image-wrap\">\n    <img class=\"card-image\" src=" + item.thumbnailUrl + " alt/>\n  </figure>\n  <div class=\"card-content\">\n    <h5 >" + item.title + "</h5>\n    <button data-item=" + item.id + " class=\"add-btn btn btn-fill\">Add to Map</button>\n  </div>\n</div>"; }).join("");
        // Add click event handler for buttons on the item cards
        Array.from(document.getElementsByClassName("add-btn")).forEach(function (element) {
            element.addEventListener("click", function () { return addLayerToMap({ id: element.getAttribute("data-item") }); });
        });
    }
    function displayFeeds(groups) {
        return __awaiter(this, void 0, void 0, function () {
            var group, items, feedContainer_1, defaultOption;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        group = groups && groups.length && groups.length > 0 ? groups[0] : null;
                        if (!group) return [3 /*break*/, 2];
                        return [4 /*yield*/, group.queryItems()];
                    case 1:
                        items = _a.sent();
                        feedContainer_1 = document.createElement("select");
                        feedContainer_1.innerHTML = "" + items.results.map(function (item) { return "\n    <option value=" + item.id + ">" + item.title + "</option>\n  "; }).join("");
                        defaultOption = document.createElement("option");
                        defaultOption.innerHTML = "Select Feed";
                        defaultOption.selected = true;
                        feedContainer_1.options.add(defaultOption, 0);
                        feedContainer_1.addEventListener("change", function () {
                            if (feedContainer_1.value) {
                                addLayerToMap({ id: feedContainer_1.value });
                            }
                        });
                        view.ui.add(new Expand({
                            content: feedContainer_1,
                            expandIconClass: "icon-social-rss",
                            expandTooltip: "Add Live Feed",
                            view: view
                        }), "top-left");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    function addLayerToMap(item) {
        return __awaiter(this, void 0, void 0, function () {
            var layer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Layer.fromPortalItem(item)];
                    case 1:
                        layer = _a.sent();
                        layer.watch("loadStatus", function (status) {
                            if (status === "loaded") {
                                view.goTo(layer.fullExtent);
                            }
                        });
                        view.map.add(layer);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleAuthentication() {
        // Switch sign in / sign out links
        var signInButton = document.getElementById("signIn");
        var signOutButton = document.getElementById("signOut");
        IdentityManager.registerOAuthInfos([new OAuthInfo({
                appId: "b3S1dvKs0rI5WJuU"
            })]);
        signInButton.addEventListener("click", function () { getCredentials(); });
        signOutButton.addEventListener("click", function () { destroyCredentials(); });
    }
    function getCredentials(credential) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If the user isn't already logged-in use getCredential
                        // to kick-off the login process
                        document.getElementById("signInNav").classList.add("hide");
                        document.getElementById("userNav").classList.remove("hide");
                        if (!!credential) return [3 /*break*/, 2];
                        return [4 /*yield*/, IdentityManager.getCredential(portalUrl)];
                    case 1:
                        credential = _a.sent();
                        _a.label = 2;
                    case 2:
                        queryItems(credential.userId);
                        document.getElementById("userName").innerHTML = credential.userId;
                        return [2 /*return*/];
                }
            });
        });
    }
    function destroyCredentials() {
        IdentityManager.destroyCredentials();
        window.location.reload();
    }
});
//# sourceMappingURL=main.js.map