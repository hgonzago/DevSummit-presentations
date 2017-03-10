    require([
      "esri/geometry/support/webMercatorUtils"
    ], function(webMercatorUtils) {
       var extent = this.view.extent;
       var geoExtent = webMercatorUtils.webMercatorToGeographic(extent);
       console.log(JSON.stringify(geoExtent));
    });