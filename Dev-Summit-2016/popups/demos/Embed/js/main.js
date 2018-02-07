define(["dojo/ready", "dojo/parser", "dojo/dom-attr", "dojo/dom-geometry", "dojo/on", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang", "dojo/query", "dojo/dom", "dojo/dom-class", "dojo/dom-construct", "dijit/registry", "esri/domUtils", "esri/lang", "esri/arcgis/utils", "esri/dijit/Popup", "esri/layers/FeatureLayer", "esri/geometry/Point", "dojo/domReady!"], function (
ready, parser, domAttr, domGeometry, on, array, declare, lang, query, dom, domClass, domConstruct, registry, domUtils, esriLang, arcgisUtils, Popup, FeatureLayer, Point) {
    return declare(null, {
        config: {},
        startup: function (config) {
            parser.parse();
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information. 
            this.config = config;
            window.config = config;

            // responsive drawer
            require(["application/sniff!drawer?application/Drawer"], lang.hitch(this, function (Drawer) {
                if (!Drawer) {
                    domClass.add(document.body, "no-title");
                    return;
                }
                this._drawer = new Drawer({
                    borderContainer: "border_container",
                    // border container node id
                    contentPaneCenter: "cp_center",
                    // center content pane node id
                    direction: this.config.i18n.direction,
                    // i18n direction "ltr" or "rtl",
                    config: this.config,
                    displayDrawer: (this.config.legend || this.config.details || this.config.popup_sidepanel),
                    drawerOpen: this.config.show_panel
                });

                // startup drawer
                this._drawer.startup();

            }));





            // document ready
            ready(lang.hitch(this, function () {

                // config will contain application and user defined info for the template such as i18n strings, the web map id
                // and application id
                // any url parameters and any application specific configuration information.
                if (config) {
                    this.config = config;
                    //supply either the webmap id or, if available, the item info
                    var itemInfo = this.config.itemInfo || this.config.webmap;
                    this._createWebMap(itemInfo);
                } else {
                    var error = new Error("Main:: Config is not defined");
                    this.reportError(error);
                }
            }));

        },
        reportError: function (error) {
            // remove loading class from body
            domClass.remove(document.body, "app-loading");
            domClass.add(document.body, "app-error");
            // an error occurred - notify the user. In this example we pull the string from the
            // resource.js file located in the nls folder because we've set the application up
            // for localization. If you don't need to support multiple languages you can hardcode the
            // strings here and comment out the call in index.html to get the localization strings.
            // set message
            var node = dom.byId("loading_message");
            if (node) {
                if (this.config && this.config.i18n) {
                    node.innerHTML = this.config.i18n.map.error + ": " + error.message;
                } else {
                    node.innerHTML = "Unable to create map: " + error.message;
                }
            }
        },
        loadMapWidgets: function () {
            require(["application/sniff!scale?esri/dijit/Scalebar"], lang.hitch(this, function (Scalebar) {
                if (!Scalebar) {
                    return;
                }
                var scalebar = new Scalebar({
                    map: this.map,
                    scalebarUnit: this.config.units
                });

            }));

            //Zoom slider needs to be visible to add home
            if (this.config.home && this.config.zoom) {
                require(["application/sniff!home?esri/dijit/HomeButton"], lang.hitch(this, function (HomeButton) {
                    if (!HomeButton) {
                        return;
                    }
                    var home = new HomeButton({
                        map: this.map
                    }, domConstruct.create("div", {}, query(".esriSimpleSliderIncrementButton")[0], "after"));
                    home.startup();
                }));

            } else {
                //add class so we can move basemap gallery button 
                domClass.add(document.body, "no-home");
            }
            //Position basemap gallery higher if zoom isn't taking up space
            if (this.config.zoom === false) {
                //add class so we can move basemap gallery button 
                domClass.add(document.body, "no-zoom");
            }
            if (this.config.zoom && this.config.zoom_position && this.config.zoom_position !== "top-left") {
                domClass.add(document.body, "no-zoom");
            }

            require(["application/sniff!legend?esri/dijit/Legend"], lang.hitch(this, function (Legend) {
                if (!Legend) {
                    return;
                }
                var legend = new Legend({
                    map: this.map,
                    layerInfos: arcgisUtils.getLegendLayers(this.config.response)
                }, domConstruct.create("div", {}, registry.byId("legend").domNode));
                legend.startup();
            }));

            if (this.config.details) {
                var template = "<div class='map-title'>{title}</div><div class='map-details'>{description}</div>";
                var content = {
                    title: this.config.response.itemInfo.item.title,
                    description: this.config.response.itemInfo.item.description || this.config.i18n.tools.details.error,
                };
                registry.byId("details").set("content", lang.replace(template, content));
            }

            //Add the location search widget
            require(["application/sniff!search?esri/dijit/Search", "application/sniff!search?esri/tasks/locator"], lang.hitch(this, function (Search, Locator) {
                if (!Search && !Locator) {
                    return;
                }

                var options = {
                    map: this.map,
                    addLayersFromMap: false
                };
                var searchLayers = false;
                var search = new Search(options, domConstruct.create("div", {
                    id: "search"
                }, "mapDiv"));
                domClass.add(dom.byId("search"), "simpleGeocoder");
                var defaultSources = [];

                //setup geocoders defined in common config 
                if (this.config.helperServices.geocode) {
                    var geocoders = lang.clone(this.config.helperServices.geocode);
                    array.forEach(geocoders, lang.hitch(this, function (geocoder) {
                        if (geocoder.url.indexOf(".arcgis.com/arcgis/rest/services/World/GeocodeServer") > -1) {

                            geocoder.hasEsri = true;
                            geocoder.locator = new Locator(geocoder.url);

                            geocoder.singleLineFieldName = "SingleLine";

                            geocoder.name = geocoder.name || "Esri World Geocoder";

                            if (this.config.searchextent) {
                                geocoder.searchextent = this.map.extent;
                                geocoder.localSearchOptions = {
                                    minScale: 300000,
                                    distance: 50000
                                };
                            }
                            defaultSources.push(geocoder);
                        } else if (esriLang.isDefined(geocoder.singleLineFieldName)) {

                            //Add geocoders with a singleLineFieldName defined 
                            geocoder.locator = new Locator(geocoder.url);

                            defaultSources.push(geocoder);
                        }
                    }));
                }

                //Add search layers defined on the web map item 
                if (this.config.response.itemInfo.itemData && this.config.response.itemInfo.itemData.applicationProperties && this.config.response.itemInfo.itemData.applicationProperties.viewing && this.config.response.itemInfo.itemData.applicationProperties.viewing.search) {
                    var searchOptions = this.config.response.itemInfo.itemData.applicationProperties.viewing.search;

                    array.forEach(searchOptions.layers, lang.hitch(this, function (searchLayer) {
                        //we do this so we can get the title specified in the item
                        var operationalLayers = this.config.itemInfo.itemData.operationalLayers;
                        var layer = null;
                        array.some(operationalLayers, function (opLayer) {
                            if (opLayer.id === searchLayer.id) {
                                layer = opLayer;
                                return true;
                            }
                        });

                        if (layer && layer.url) {
                            var source = {};
                            var url = layer.url;

                            if (esriLang.isDefined(searchLayer.subLayer)) {
                                url = url + "/" + searchLayer.subLayer;
                                array.some(layer.layerObject.layerInfos, function (info) {
                                    if (info.id == searchLayer.subLayer) {
                                        name += " - " + layer.layerObject.layerInfos[searchLayer.subLayer].name;
                                        return true;
                                    }

                                });
                            }

                            source.featureLayer = new FeatureLayer(url);


                            source.name = layer.title || layer.name;

                            source.exactMatch = searchLayer.field.exactMatch;
                            source.searchField = [searchLayer.field.name];
                            source.placeholder = searchOptions.hintText;
                            defaultSources.push(source);
                            searchLayers = true;
                        }

                    }));
                }




                search.set("sources", defaultSources);
                //set the first non esri layer as active if search layers are defined. 
                var activeIndex = 0;
                if (searchLayers) {
                    array.some(defaultSources, function (s, index) {
                        if (!s.hasEsri) {
                            activeIndex = index;
                            return true;
                        }
                    });


                    if (activeIndex > 0) {
                        search.set("activeSourceIndex", activeIndex);
                    }
                }


                search.startup();


            }));


            require(["application/sniff!basemap_gallery?esri/dijit/BasemapGallery"], lang.hitch(this, function (BasemapGallery) {
                if (!BasemapGallery) {
                    return;
                }
                var galleryOptions = {
                    showArcGISBasemaps: true,
                    portalUrl: this.config.sharinghost,
                    basemapsGroup: this._getBasemapGroup(),
                    map: this.map
                };
                var gallery = null;
                //add a button below the slider to show/hide the basemaps 
                var mainContainer = domConstruct.create("div", {
                    "class": "icon-basemap-container active-toggle",
                    "click": lang.hitch(this, this._displayBasemapContainer)
                }, this.map.id + "_root");


                domConstruct.create("div", {
                    "class": "icon-basemap",
                    "title": this.config.i18n.tools.basemap.label
                }, mainContainer);


                //Create a container to hold the basemap gallery title, gallery and also draw
                //the callout arrow 
                var container = domConstruct.create("div", {
                    id: "gallery_container"
                }, dom.byId("mapDiv"));

                domConstruct.create("div", {
                    "class": "arrow_box",
                    innerHTML: "<div class='basemap_title'>" + this.config.i18n.tools.basemap.title + "</div><span id='embed-icon-menu-close' class='embed-icon-menu-close'></span><div id='full_gallery'></div>"
                }, container);

                //add a class so we can move the basemap if the zoom position moved.
                if (this.config.zoom && this.config.zoom_position) {
                    domClass.add(mainContainer, "embed-" + this.config.zoom_position);
                    domClass.add(dom.byId("gallery_container"), "embed-" + this.config.zoom_position);
                }


                gallery = new BasemapGallery(galleryOptions, dom.byId("full_gallery"));
                gallery.startup();
                var closemenu = dom.byId("embed-icon-menu-close");
                if (closemenu) {
                    on(closemenu, "click", lang.hitch(this, function () {
                        this._displayBasemapContainer();
                    }));
                }

                //Hide the basemap gallery at startup
                this._displayBasemapContainer();

            }));

            require(["application/sniff!basemap_toggle?esri/dijit/BasemapToggle", "application/sniff!basemap_toggle?esri/basemaps"], lang.hitch(this, function (BasemapToggle, basemaps) {
                if (!BasemapToggle && !basemaps) {
                    return;
                }

                var toggle_container = domConstruct.create("div", {}, "mapDiv");

                /* Start temporary until after JSAPI 4.0 is released */
                var bmLayers = [],
                    mapLayers = this.map.getLayersVisibleAtScale(this.map.getScale());
                if (mapLayers) {
                    for (var i = 0; i < mapLayers.length; i++) {
                        if (mapLayers[i]._basemapGalleryLayerType) {
                            var bmLayer = this.map.getLayer(mapLayers[i].id);
                            if (bmLayer) {
                                bmLayers.push(bmLayer);
                            }
                        }
                    }
                }
                on.once(this.map, "basemap-change", lang.hitch(this, function () {
                    if (bmLayers && bmLayers.length) {
                        for (var i = 0; i < bmLayers.length; i++) {
                            bmLayers[i].setVisibility(false);
                        }
                    }
                })); /* END temporary until after JSAPI 4.0 is released */


                var toggle = new BasemapToggle({
                    map: this.map,
                    basemap: this.config.alt_basemap || "satellite"
                }, toggle_container);


                if (this.config.response && this.config.response.itemInfo && this.config.response.itemInfo.itemData && this.config.response.itemInfo.itemData.baseMap) {
                    var b = this.config.response.itemInfo.itemData.baseMap;
                    if (b.title === "World Dark Gray Base") {
                        b.title = "Dark Gray Canvas";
                    }
                    if (b.title) {
                        for (var j in basemaps) {
                            //use this to handle translated titles
                            if (b.title === this._getBasemapName(j)) {
                                toggle.defaultBasemap = j;
                                //remove at 4.0
                                if (j === "dark-gray") {
                                    if (this.map.layerIds && this.map.layerIds.length > 0) {
                                        this.map.basemapLayerIds = this.map.layerIds.slice(0);
                                        this.map._basemap = "dark-gray";
                                    }
                                }
                                //end remove at 4.0
                                this.map.setBasemap(j);
                            }
                        }
                    }
                }


                //add a class so we can move the basemap if the zoom position moved.
                if (this.config.zoom && this.config.zoom_position) {
                    domClass.add(toggle.domNode, "embed-" + this.config.zoom_position);
                }

                if (this.config.scale) {
                    domClass.add(toggle.domNode, "scale");
                }


                toggle.startup();


            }));

            if (this.config.active_panel) {
                var tabs = registry.byId("tabContainer");
                if (tabs) {
                    var panel = registry.byId(this.config.active_panel);
                    if (panel) {
                        tabs.selectChild(this.config.active_panel);
                    }
                }
            }
            var bc = registry.byId("border_container");
            if (bc) {
                bc.resize();
            }

        },
        _getBasemapName: function (name) {
            var current = null;
            switch (name) {
            case "dark-gray":
                current = "Dark Gray Canvas";
                break;
            case "gray":
                current = "Light Gray Canvas";
                break;
            case "hybrid":
                current = "Imagery with Labels";
                break;
            case "national-geographic":
                current = "National Geographic";
                break;
            case "oceans":
                current = "Oceans";
                break;
            case "osm":
                current = "OpenStreetMap";
                break;
            case "satellite":
                current = "Imagery";
                break;
            case "streets":
                current = "Streets";
                break;
            case "terrain":
                current = "Terrain with Labels";
                break;
            case "topo":
                current = "Topographic";
                break;
            }
            return current;
        },
        _adjustPopupSize: function () {
            if (!this.map) {
                return;
            }
            var box = domGeometry.getContentBox(this.map.container);

            var width = 270,
                height = 300,
                newWidth = Math.round(box.w * 0.50),
                newHeight = Math.round(box.h * 0.35);
            if (newWidth < width) {
                width = newWidth;
            }
            if (newHeight < height) {
                height = newHeight;
            }
            this.map.infoWindow.resize(width, height);
        },
        _displayBasemapContainer: function () {
            var node = null,
                gallery = query(".basemap_gallery");
            if (gallery && gallery.length > 0) {
                node = gallery[0];
            } else {
                node = dom.byId("gallery_container");
            }
            domClass.toggle(query(".icon-basemap-container")[0], "active-toggle");
            domUtils.toggle(node);

        },

        // create a map based on the input web map id
        _createWebMap: function (itemInfo) {

            //modify the extent if provided via url params
            if (this.config.extent) {
                var extent = decodeURIComponent(this.config.extent).split(",");
                if (extent && extent.length && extent.length === 4) {
                    itemInfo.item.extent = [
                        [parseFloat(extent[0]), parseFloat(extent[1])],
                        [parseFloat(extent[2]), parseFloat(extent[3])]
                    ];
                }
            }



            var customPopup = new Popup({
                titleInBody: true
            }, domConstruct.create("div"));
            domClass.add(document.body, this.config.theme);
            domClass.add(customPopup.domNode, this.config.theme);

            var options = {
                slider: this.config.zoom,
                sliderPosition: this.config.zoom_position,
                infoWindow: customPopup,
                logo: (this.config.logoimage === null) ? true : false
            };
            //specify center and zoom if provided as url params 
            if (this.config.level) {
                options.zoom = this.config.level;
            }
            if (this.config.center) {
                var points = this.config.center.split(",");
                if (points && points.length === 2) {
                    options.center = [parseFloat(points[0]), parseFloat(points[1])];
                }

            }
            arcgisUtils.createMap(itemInfo, "mapDiv", {
                mapOptions: options,
                usePopupManager: true,
                editable: false,
                bingMapsKey: this.config.bingKey
            }).then(lang.hitch(this, function (response) {
                this.map = response.map;
                this.config.response = response;
                this._adjustPopupSize();
                if (this.config.logoimage) {
                    query(".esriControlsBR").forEach(lang.hitch(this, function (node) {
                        var link = null;
                        if (this.config.logolink) {
                            link = domConstruct.create("a", {
                                href: this.config.logolink,
                                target: "_blank"
                            }, node);
                        }

                        //create a logo image
                        domConstruct.create("img", {
                            src: this.config.logoimage,
                            "class": "logo"
                        }, link || node);

                    }));
                }

                //disable mouse zoom
                if (this.config.disable_scroll) {
                    this.map.disableScrollWheelZoom();
                }

                // remove loading class from body
                domClass.remove(document.body, "app-loading");

                if (this.config.popup_sidepanel) { //display popup content in the side panel
                    this.map.infoWindow.set("popupWindow", false);
                    this._initializeSidepanel();
                }

                require(["application/sniff!marker?esri/symbols/PictureMarkerSymbol", "application/sniff!marker?esri/graphic", "application/sniff!marker?esri/dijit/PopupTemplate"], lang.hitch(this, function (PictureMarkerSymbol, Graphic, PopupTemplate) {
                    if (!PictureMarkerSymbol && !Graphic && !PopupTemplate) {
                        return;
                    }
                    var symbolInfo = decodeURIComponent(this.config.marker).split(";");
                    if (symbolInfo.length === 1) {
                        symbolInfo = decodeURIComponent(this.config.marker).split(",");
                    }

                    if (symbolInfo && symbolInfo.length && symbolInfo.length >= 6) {
                        var x = symbolInfo[0],
                            y = symbolInfo[1],
                            wkid = symbolInfo[2],
                            description = symbolInfo[3],
                            icon_url = symbolInfo[4],
                            label = symbolInfo[5];

                        var markerSymbol = new PictureMarkerSymbol(icon_url || this.config.marker_symbol, 26, 26);
                        var point = new Point({
                            "x": x,
                            "y": y,
                            "spatialReference": {
                                "wkid": wkid || 4326
                            }
                        });

                        var infoTemplate = null;
                        if (description || label) {
                            infoTemplate = new PopupTemplate({
                                "title": label || null,
                                "description": description || null
                            });
                        }
                        var graphic = new Graphic(point, markerSymbol, null, infoTemplate);

                        this.map.graphics.add(graphic);
                        if (description || label) {
                            this.map.infoWindow.setFeatures([graphic]);
                            this.map.infoWindow.show(point);
                        }

                        //set the marker location to the map center 
                        this.map.centerAt(point);
                    }

                }));


                this.loadMapWidgets();

                // map has been created. You can start using it.
                // If you need map to be loaded, listen for it's load event.
            }), this.reportError);
        },
        _displayPopupContent: function (feature, selectedIdx, count) {
            if (feature) {
                var content = feature.getContent();
                registry.byId("info_content").set("content", content);
                if (selectedIdx && count) {
                    domAttr.set(dom.byId("nav_count"), "innerHTML", "" + selectedIdx + "/" + count);
                }
            }
        },
        _initializeSidepanel: function () {
            var popup = this.map.infoWindow;
            popup.on("selection-change", lang.hitch(this, function () {
                if (popup.count > 1) {
                    this._displayPopupContent(popup.getSelectedFeature(), (popup.selectedIndex + 1), popup.count);

                    domAttr.set(dom.byId("prev_nav"), "disabled", false);
                    domAttr.set(dom.byId("next_nav"), "disabled", false);
                    if (popup.selectedIndex === 0) {
                        domAttr.set(dom.byId("prev_nav"), "disabled", true);
                    } else if (popup.selectedIndex + 1 === popup.count) {
                        domAttr.set(dom.byId("next_nav"), "disabled", true);
                    }
                } else {
                    this._displayPopupContent(popup.getSelectedFeature());
                }
            }));
            popup.on("clear-features", lang.hitch(this, function () {
                domUtils.hide(dom.byId("popupNav"));
                registry.byId("info_content").set("content", "");
                domAttr.set(dom.byId("prev_nav"), "disabled", false);
                domAttr.set(dom.byId("next_nav"), "disabled", false);
                dom.byId("nav_count").innerHTML = "";

            }));
            popup.on("set-features", lang.hitch(this, function () {
                registry.byId("tabContainer").selectChild("popup");
                var drawer = query(".drawer-open");
                if (drawer && drawer.length === 0) {
                    //drawer is not open so open it  
                    this._drawer.toggle();
                }


                if (popup.features && popup.features.length > 1) {
                    this._displayPopupContent(popup.getSelectedFeature(), (popup.selectedIndex + 1), popup.count);
                    //starting at first feature
                    domUtils.show(dom.byId("popupNav"));
                    domAttr.set(dom.byId("next_nav"), "disabled", false);
                    domAttr.set(dom.byId("prev_nav"), "disabled", true);
                } else {
                    domUtils.hide(dom.byId("popupNav"));
                    this._displayPopupContent(popup.getSelectedFeature());
                }
            }));
            on(dom.byId("prev_nav"), "click", function () {
                popup.selectPrevious();
            });
            on(dom.byId("next_nav"), "click", function () {
                popup.selectNext();
            });
        },
        _getBasemapGroup: function () {
            //Get the id or owner and title for an organizations custom basemap group.
            var basemapGroup = null;
            if (this.config.basemapgroup && this.config.basemapgroup.title && this.config.basemapgroup.owner) {
                basemapGroup = {
                    "owner": this.config.basemapgroup.owner,
                    "title": this.config.basemapgroup.title
                };
            } else if (this.config.basemapgroup && this.config.basemapgroup.id) {
                basemapGroup = {
                    "id": this.config.basemapgroup.id
                };
            }
            return basemapGroup;
        }
    });
});