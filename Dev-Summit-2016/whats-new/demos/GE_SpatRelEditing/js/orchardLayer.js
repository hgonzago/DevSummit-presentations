define([
  "esri/layers/FeatureLayer",
  "esri/renderers/SimpleRenderer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/Color"
], function(
  FeatureLayer,
  SimpleRenderer,
  SimpleFillSymbol, SimpleLineSymbol,
  Color
) {

  var orchardJson = {
    "objectIdFieldName": "OBJECTID",
    "globalIdFieldName": "",
    "geometryType": "esriGeometryPolygon",
    "spatialReference": {
      "wkid": 102100,
      "latestWkid": 3857
    },
    "fields": [{
      "name": "OBJECTID",
      "type": "esriFieldTypeOID",
      "alias": "OBJECTID",
      "sqlType": "sqlTypeOther",
      "domain": null ,
      "defaultValue": null 
    }, {
      "name": "NAME",
      "type": "esriFieldTypeString",
      "alias": "NAME",
      "sqlType": "sqlTypeOther",
      "length": 100,
      "domain": null ,
      "defaultValue": null 
    }, {
      "name": "AREA",
      "type": "esriFieldTypeString",
      "alias": "AREA",
      "sqlType": "sqlTypeOther",
      "length": 100,
      "domain": null ,
      "defaultValue": null 
    }, {
      "name": "GlobalID",
      "type": "esriFieldTypeGlobalID",
      "alias": "GlobalID",
      "sqlType": "sqlTypeOther",
      "length": 38,
      "domain": null ,
      "defaultValue": null 
    }],
    "features": [{
      "attributes": {
        "OBJECTID": 6,
        "NAME": "apple",
        "AREA": "calculate this",
        "GlobalID": "eb9337a3-0edd-48c7-9acf-0151c4310153"
      },
      "geometry": {
        "rings": [[[-13056478.2271, 6077897.9925], [-13055890.7646, 6077901.4887], [-13055886.5869, 6077768.2201], [-13055887.8402, 6077728.532], [-13055891.6001, 6077703.048], [-13055898.2845, 6077680.4885], [-13055905.8043, 6077665.031], [-13055914.5775, 6077652.4979], [-13055926.275, 6077637.876], [-13055949.2524, 6077620.7474], [-13055975.5719, 6077609.0499], [-13056000.2203, 6077603.2011], [-13056034.8952, 6077601.53], [-13056099.6495, 6077602.3655], [-13056165.5846, 6077601.3813], [-13056282.6647, 6077601.3813], [-13056473.7252, 6077604.773], [-13056478.2271, 6077897.9925]]]
      }
    }]
  };
  
  var layerDef = {
    "geometryType": orchardJson.geometryType,
    "fields": orchardJson.fields,
    "spatialReference": orchardJson.spatialReference
  };
  
  var layer = new FeatureLayer(
    {
      layerDefinition: layerDef,
      featureSet: orchardJson
    },
    {
      mode: FeatureLayer.MODE_SNAPSHOT
    }
  );
  
  layer.setRenderer(
    new SimpleRenderer(
      new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new Color([100, 255, 100]),
          4
        ),
        new Color([175, 255, 155, 0.3])
      )
    )
  );
  
  
  return layer;
}
);
