/*Create a geocoder widget
Will display multiple  locators if organization has more than one locator defined
Adds support for info window that allows users to find different search results */
define(["dojo/_base/declare", "dojo/Deferred", "esri/dijit/Geocoder", "esri/dijit/PopupTemplate", "esri/layers/FeatureLayer", "esri/geometry/Extent", "esri/geometry/Point", "esri/lang", "dojo/dom-construct", "dojo/dom", "dojo/dom-style", "dojo/on", "dijit/registry", "dojo/query", "dojo/_base/lang", "dojo/_base/array"

], function (
declare, Deferred, Geocoder, PopupTemplate, FeatureLayer, Extent, Point, esriLang, domConstruct, dom, domStyle, on, registry, query, lang, array

) {
    return declare(null, {
        map: null,
        geocoder: null,
        allResults: null,
        config: null,
        content: null,
        geocoders: [],
        geocodeFeatureLayers: {},
        constructor: function (args) {
            this.map = args.map;
            this.config = args.config;

            var options = this._createGeocoderOptions();
            this.geocoder = new Geocoder(options, this.geocoderDiv);

            this.geocoder.startup();
            this.geocoder.on("find-results", lang.hitch(this, this.checkResults));
            this.geocoder.on("select", lang.hitch(this, this.showGeocodingResult));
            this.geocoder.on("auto-complete", lang.hitch(this, this.clearGeocodeResults));
            this.geocoder.on("clear", lang.hitch(this, this.clearGeocodeResults));

        },

        checkResults: function (geocodeResults) {
            this.allResults = null;
            if (geocodeResults && geocodeResults.results && geocodeResults.results.results) {
                geocodeResults.results = geocodeResults.results.results;
            }
            if ((!geocodeResults || !geocodeResults.results || !geocodeResults.results.length)) {
                alert(this.config.i18n.tools.search.error);
            } else if (geocodeResults) {
                this.allResults = geocodeResults.results;
            }
        },
        clearGeocodeResults: function () {
            if (this.map.infoWindow.isShowing) {
                this.map.infoWindow.hide();
            }
            this.allResults = null;
        },
        showGeocodingResult: function (result, pos) {
            this.map.infoWindow.hide();


            var geocodeResult = result.result || result;

            var bestView;
            var anchorPoint = geocodeResult.feature.geometry;
            if (anchorPoint.type === "polygon") {
                anchorPoint = anchorPoint.getCentroid();
                bestView = geocodeResult.feature.geometry.getExtent().expand(1.1);
            } else if (anchorPoint.type === "polyline") {
                anchorPoint = anchorPoint.getPoint(0, 0);
                bestView = geocodeResult.feature.geometry.getExtent().expand(1.1);
            } else if (anchorPoint.type === "multipoint") {
                anchorPoint = anchorPoint.getPoint(0);
                bestView = geocodeResult.feature.geometry.getExtent().expand(1.1);
            } else {
                bestView = this.map.extent.centerAt(anchorPoint).expand(0.0625);
            }
            if (geocodeResult.extent && !isNaN(geocodeResult.extent.xmin) && !isNaN(geocodeResult.extent.ymin) && !isNaN(geocodeResult.extent.xmax) && !isNaN(geocodeResult.extent.ymax)) {
                bestView = geocodeResult.extent;
            }
            //Add feature search support 
            var featureSearch = false;
            if (result.target && result.target.activeGeocoder) {
                var activeGeocoder = result.target.activeGeocoder;
                if (esriLang.isDefined(activeGeocoder.type)) {
                    if (activeGeocoder.type === "query") {
                        //get the layer 
                        if (activeGeocoder.layerId) {
                            var layer = this.map.getLayer(activeGeocoder.layerId);
                            if (activeGeocoder.subLayerId) {
                                if (layer.infoTemplates && layer.infoTemplates[activeGeocoder.subLayerId]) {
                                    geocodeResult.feature.infoTemplate = layer.infoTemplates[activeGeocoder.subLayerId].infoTemplate;
                                    featureSearch = true;
                                    this._getPopupFeatureLayer(layer, activeGeocoder.subLayerId, geocodeResult.feature.infoTemplate).then(lang.hitch(this, function (layerResult) {
                                        if (!layerResult) {
                                            return;
                                        }

                                        //Info template defined so create a feature layer and display the popup
                                        if (layerResult.infoTemplate) {
                                            geocodeResult.feature._layer = layerResult;

                                            this.map.infoWindow.setFeatures([geocodeResult.feature]);
                                            this.map.infoWindow.show(anchorPoint);
                                            this.map.setExtent(bestView);
                                        }
                                    }));
                                } else {
                                    //No info template defined so just show popup with info"
                                    this.map.infoWindow.setTitle(activeGeocoder.name);
                                    this.map.infoWindow.setContent(geocodeResult.name);
                                    this.map.infoWindow.show(anchorPoint);
                                    this.map.setExtent(bestView);
                                    featureSearch = true;
                                }
                            } else {
                                //Feature layer so get the popup info, associate it with the result, then display 
                                if (layer.infoTemplate) {
                                    geocodeResult.feature.infoTemplate = layer.infoTemplate;
                                    geocodeResult.feature._layer = layer;
                                    this.map.infoWindow.setFeatures([geocodeResult.feature]);
                                    this.map.infoWindow.show(anchorPoint);
                                    this.map.setExtent(bestView);
                                    featureSearch = true;
                                }
                            }

                        }
                    }
                }
            }

            if (featureSearch) {
                return;
            }

            if (!esriLang.isDefined(pos)) {
                pos = 0;
            }
            //Locator based geocode results handled here 
            this.setupInfoWindowAndZoom(geocodeResult.name, anchorPoint, bestView, geocodeResult, pos);

        },
        _getPopupFeatureLayer: function (mapLayer, subLayerId, popupInfo) {

            var deferred = new Deferred();
            if (this.geocodeFeatureLayers[mapLayer.id] && this.geocodeFeatureLayers[mapLayer.id][subLayerId]) {
                //already have it 
                deferred.resolve(this.geocodeFeatureLayers[mapLayer.id][subLayerId]);
            } else {
                var url = mapLayer.url + "/" + subLayerId;
                if (mapLayer.dynamicLayerInfos) {
                    array.some(mapLayer.dynamicLayerInfos, lang.hitch(this, function (dynLayerInfo) {
                        if (dynLayerInfo.id === subLayerId) { //don't have this info but leaving for now
                            url = mapLayer.url + "/" + dynLayerInfo.source.mapLayerId;
                            return true;
                        }
                    }));
                }

                var params = {
                    mode: FeatureLayer.MODE_SELECTION,
                    outFields: ["*"],
                    infoTemplate: popupInfo && popupInfo.info && new PopupTemplate(popupInfo.info)
                };
                var layer = new FeatureLayer(url, params);
                layer.on("load", lang.hitch(this, function () {
                    //save the layer for later 
                    this.geocodeFeatureLayers[mapLayer.id] = this.geocodeFeatureLayers[mapLayer.id] || {};
                    this.geocodeFeatureLayers[mapLayer.id][subLayerId] = layer;

                    deferred.resolve(layer);

                }), function (error) {
                    deferred.resolve(null);
                });

            }


            return deferred.promise;
        },
        setupInfoWindowAndZoom: function (content, geocodeLocation, newExtent, geocodeResult, pos) {
            this.map.infoWindow.clearFeatures();

            //Show info window
            if (this.allResults && this.allResults.length > 1) {
                //let's update the content to show additional results 
                var currentLocationName = content;
                var attr = this.allResults[pos].feature.attributes;
                content = "<div id='geocodeCurrentResult' style='display:none;'><span style='font-weight:bold;'>";
                content += this.config.i18n.tools.search.currentLocation;
                content += "</span></div>";
                content += "<span>";

                if (!attr.Match_addr) {
                    content += currentLocationName;
                } else {
                    content += attr.Match_addr;
                    if (attr.stAddr && attr.City) {
                        content += " - " + attr.stAddr + ", " + attr.City;
                    } else if (attr.stAddr) {
                        content += " - " + attr.stAddr;
                    }
                }

                content += "</span>";
                content += "<div id='geocodeWantOtherResults'>";
                content += "<a id='results' style='cursor:pointer'>";

                content += this.config.i18n.tools.search.notWhatYouWanted;
                content += "</a>";
                content += "</div>";
                content += "<div id='geocodeOtherResults' style='display:none;'><span style='font-weight:bold;'>";
                content += this.config.i18n.tools.search.selectAnother;
                content += "</span><br/>";
                for (var i = 0; i < this.allResults.length; i++) {
                    if (i !== pos) {
                        var result = this.allResults[i];
                        attr = result.feature.attributes;
                        content += "<a style='cursor:pointer' class='li_item' id=" + i + ">";

                        if (!attr.Match_addr) {
                            content += result.name;
                        } else {
                            //content += result.feature.attributes.Place_addr ? (" - " + result.feature.attributes.Place_addr) : ""
                            content += attr.Match_addr;
                            if (attr.stAddr && attr.City) {
                                content += " - " + attr.stAddr + ", " + attr.City;
                            } else if (attr.stAddr) {
                                content += " - " + attr.stAddr;
                            }
                        }

                        content += "</a><br/>";
                    }
                }
                content += "</div>";

            }

            //display a popup for the result
            this.map.infoWindow.setTitle(this.config.i18n.tools.search.title);

            this.map.infoWindow.setContent(content);

            query(".li_item").forEach(lang.hitch(this, function (node) {
                on(node, "click", lang.hitch(this, function () {
                    if (node.id >= 0) {
                        this.selectAnotherResult(node.id);
                    }
                }));

            }));
            var resDiv = dom.byId("results");
            if (resDiv) {
                on(resDiv, "click", lang.hitch(this, function () {
                    this.showOtherResults();
                }));
            }

            var location = new Point(geocodeLocation.x, geocodeLocation.y, geocodeLocation.spatialReference);

            this.map.setExtent(newExtent).then(lang.hitch(this, function () {
                this.map.infoWindow.show(location);
            }));

        },
        showOtherResults: function () {

            domStyle.set(dom.byId("geocodeWantOtherResults"), "display", "none");
            domStyle.set(dom.byId("geocodeCurrentResult"), "display", "block");
            domStyle.set(dom.byId("geocodeOtherResults"), "display", "block");

        },
        selectAnotherResult: function (pos) {
            this.showGeocodingResult(this.allResults[pos], pos);
        },
        _createGeocoderOptions: function () {
            //Check for multiple geocoder support and setup options for geocoder widget. 
            var hasEsri = false,
                geocoders = lang.clone(this.config.helperServices.geocode);

            array.forEach(geocoders, lang.hitch(this, function (geocoder, index) {

                if (geocoder.url.indexOf(".arcgis.com/arcgis/rest/services/World/GeocodeServer") > -1) {
                    hasEsri = true;
                    geocoder.name = "Esri World Geocoder";
                    geocoder.outFields = "Match_addr, stAddr, City";
                    geocoder.singleLineFieldName = "SingleLine";
                    geocoder.esri = geocoder.placefinding = true;
                    //set local search if defined in config 
                    if (this.config.searchextent) {
                        geocoder.searchExtent = this.map.extent;
                    }

                    geocoder.localSearchOptions = {
                        minScale: 300000,
                        distance: 50000
                    };
                }

            }));
            //only use geocoders with a singleLineFieldName 
            geocoders = array.filter(geocoders, function (geocoder) {
                return (esriLang.isDefined(geocoder.singleLineFieldName));
            });
            var esriIdx;
            if (hasEsri) {
                for (var i = 0; i < geocoders.length; i++) {
                    if (esriLang.isDefined(geocoders[i].esri) && geocoders[i].esri === true) {
                        esriIdx = i;
                        break;
                    }
                }
            }
            var options = {
                map: this.map,
                autoNavigate: false,
                minCharacters: 0,
                maxLocations: 5,
                searchDelay: 100,
                theme: "simpleGeocoder",
                autoComplete: hasEsri
            };


            //If there is a valid search id and field defined add the feature layer to the geocoder array
            var searchLayers = [];
            if (this.config.response.itemInfo.itemData && this.config.response.itemInfo.itemData.applicationProperties && this.config.response.itemInfo.itemData.applicationProperties.viewing && this.config.response.itemInfo.itemData.applicationProperties.viewing.search) {
                var searchOptions = this.config.response.itemInfo.itemData.applicationProperties.viewing.search;


                array.forEach(searchOptions.layers, lang.hitch(this, function (searchLayer) {
                    var operationalLayers = this.config.itemInfo.itemData.operationalLayers;
                    var layer = null;
                    array.some(operationalLayers, function (opLayer) {
                        if (opLayer.id === searchLayer.id) {
                            layer = opLayer;
                            return true;
                        }
                    });
                    if (layer && layer.hasOwnProperty("url")) {
                        var url = layer.url;
                        var field = searchLayer.field.name;
                        var name = layer.title;
                        if (esriLang.isDefined(searchLayer.subLayer)) {
                            url = url + "/" + searchLayer.subLayer;
                            array.some(layer.layerObject.layerInfos, function (info) {
                                if (info.id == searchLayer.subLayer) {
                                    name += " - " + layer.layerObject.layerInfos[searchLayer.subLayer].name;
                                    return true;
                                }

                            });
                        }
                        searchLayers.push({
                            "name": name,
                            "url": url,
                            "field": field,
                            "exactMatch": (searchLayer.field.exactMatch || false),
                            "placeholder": searchOptions.hintText,
                            "outFields": "*",
                            "type": "query",
                            "layerId": searchLayer.id,
                            "subLayerId": parseInt(searchLayer.subLayer) || null
                        });

                    }

                }));

            }


            if (hasEsri && esriIdx === 0) { // Esri geocoder is primary
                options.arcgisGeocoder = false;
                if (geocoders.length > 0) {
                    options.geocoders = searchLayers.length ? searchLayers.concat(geocoders) : geocoders;
                } else if (searchLayers.length > 0) {
                    options.geocoders = searchLayers;
                }
            } else { // Esri geocoder is not primary
                options.arcgisGeocoder = false;
                options.geocoders = searchLayers.length ? searchLayers.concat(geocoders) : geocoders;
            }


            return options;
        }
    });

});