define([
    "dojo/_base/declare",
    "dojo/dom-class",
    "dojo/dom-style",
    "dijit/_WidgetBase",
    "./LayerItem"
  ],
  function(declare, domClass, domStyle,
    _WidgetBase,
    LayerItem
  ) {
    var LayerWidget = declare([_WidgetBase], {

      map: undefined,
      _layerItems: undefined,
      _onHandles: undefined,

      constructor: function(params, srcNodeRef) {
        this._layerItems = [];
        this._onHandles = [];
      },

      destroy: function() {
        this._onHandles.forEach(function(h) {
          h.remove();
        });
        this._onHandles.length = 0;
        this._destroyAllLayerItems();
      },  

      postMixInProperties: function() {},

      postCreate: function() {
        this._init();
        this.startup();
      },

      _setViewAttr: function(value) {
        this.view = value;
        this.map = value.map;
        this.view.watch("map", function(newValue) {
          this.set("map", newValue);
        }.bind(this));
      },

      _init: function() {
        domClass.add(this.domNode, "LayerWidget");
        this._setupAllLayerItems();
        var h = this.view.layerViews.on("change", function(evt) {
          this.reload();
        }.bind(this));
        this._onHandles.push(h);
      },

      reload: function() {
        this._destroyAllLayerItems();
        this._setupAllLayerItems();
      },

      _destroyAllLayerItems: function() {
        for (var i = 0; i < this._layerItems.length; i++) {
          if (this._layerItems[i]) {
            this._layerItems[i].destroy();
          }
        }
        this._layerItems.length = 0;
      },

      _setupAllLayerItems: function() {
        var layerViews = this.view.layerViews,
            numLayerViews = layerViews.length;
        layerViews.forEach(function(layerview, index) {
          var item = this._createLayerItem(layerview.layer);
          if (item) {
            item.placeAt(this.domNode, numLayerViews - index -1);
          }
          this._layerItems.push(item);
        }, this)
      },

      _removeLayerItem: function(layer) {
        for (var i = 0; i < this._layerItems.length; i++) {
          if (this._layerItems[i].layer === layer) {
            this._layerItems[i].destroy();
            this._layerItems.splice(i, 1);
          }
        }
      },
      _createLayerItem: function(layer) {
        if (layer.listMode === 'hide') {
          return null;
        }
        return new LayerItem({
          map: this.map,
          view: this.view,
          layer: layer,
          layerWidget: this
        });
      }

    });
    return LayerWidget;

  }
);
