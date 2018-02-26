var view;
require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "dojo/domReady!"
], function(Map, FeatureLayer, MapView) {

    /******************************************************************
     *
     * Add featurelayers to the map example
     *
     ******************************************************************/
  
    var activitiesLayer = new FeatureLayer({
       // activities 
       url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Activities/FeatureServer/0"
    });

    var foodLayer = new FeatureLayer({
        //food
        url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Restaurant_locations/FeatureServer/0"
    });

    var hoods = new FeatureLayer({
        //Neighborhoods
        url: "http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Palm_Springs_Neighborhoods/FeatureServer/0"
    });

    // Option 1: Add layer(s) to map using constructor option
    var map = new Map({
        basemap: "streets-vector",
        layers: [hoods, foodLayer, activitiesLayer]
    });

    //Option 2: use map.add method for single layer or addMany for multiple
    //  map.addMany([hoods, foodLayer]);
    foodLayer.watch("loadStatus", function(status) {
        // status types not-loaded, loading, loaded, failed
        console.log("'" + foodLayer.title + "'" + " " + status);
        if (status === "failed") {
            console.log(foodLayer.loadError);
        }
    });

     view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 13,
        center: [-116.5403668778997, 33.82106252508553]
    });
});
