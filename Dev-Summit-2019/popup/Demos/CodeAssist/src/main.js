import MapView from "esri/views/MapView";
import Map from "esri/Map";

let map = new Map({
  basemap: "streets"
});

let view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 6,
  center: [15, 65]
});
