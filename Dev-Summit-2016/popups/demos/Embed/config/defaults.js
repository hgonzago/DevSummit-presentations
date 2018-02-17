/*global define,location */
/*jslint sloppy:true */
/*
 | Copyright 2014 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define({
    //Default configuration settings for the application. This is where you'll define things like a bing maps key,
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings and url parameters.
    "appid": "",
    "webmap": "18129ed69e13400490ab337a02147e91",
    "oauthappid": null, //"AFTKRmv16wj14N3z",
    "extent": null,
    "home": false,
    "zoom": true,
    "zoom_position":"top-left",
    "scale": true,
    "search": true,
    "searchextent": true,
    "logoimage":null,
    "logolink":null,
    "basemap_toggle": false,
    "basemap_gallery": false,
    //"streets" , "satellite" , "hybrid", "topo", "gray", "oceans", "national-geographic" "osm"
    "alt_basemap": "satellite", 
    "legend": true,
    "popup_sidepanel": true,
    "details":false,
    "active_panel" : "popup", //"legend, details, popup"
    "find": null,
    "show_panel": true,
    "theme": "light",
    //"popuptheme": "light", //light or dark
    "marker_symbol": "images/EsriBluePinCircle26.png",
    "level": null,
    "center": null,
    "disable_scroll":true,
    //Enter the url to the proxy if needed by the application. See the 'Using the proxy page' help topic for details
    //http://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "",
    "bingKey": "", //Enter the url to your organizations bing maps key if you want to use bing basemaps
    //Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": location.protocol + "//" + "www.arcgis.com",
    "units": null,
    //If your applcation needs to edit feature layer fields set this value to true. When false the map will
    //be dreated with layers that are not set to editable which allows the FeatureLayer to load features optimally. 
    "editable": false,
    "helperServices": {
        "geometry": {
            "url": null
        },
        "printTask": {
            "url": null
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": null
        }]
    }
});
