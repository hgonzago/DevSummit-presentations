define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/on",

    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/LayerItem.html",

    "dijit/form/RadioButton",
    "dijit/form/CheckBox",

    "esri/layers/GroupLayer"

  ],
  function(declare, dom, domCtr, domClass, domStyle, domAttr, on,
    _WidgetBase, _TemplatedMixin, template,
    RadioButton, CheckBox,
    GroupLayer) {

    var LayerItem = declare([_WidgetBase, _TemplatedMixin], {

      name: "LayerItem",
      templateString: template,
      map: undefined,
      layer: undefined,

      _setLayerAttr: function(layer) {
        this._set("layer", layer);
        if (layer && layer.declaredClass === "esri.layers.GroupLayer") {
          this.isGroupLayer = true;
          if (this.domNode) {
            domClass.add(this.domNode, "GroupLayerItem");
          }
        }

      },
      parentGroup: undefined,
      parentLayerItem: undefined,
      layerTitle: undefined,
      _setLayerTitleAttr: function(title){
        this._set("layerTitle", title);
        if (this.titleNode){
          this.titleNode.textContent = title;
          this.titleNode.title = title;
        }
      },
      layerVisible: undefined,
      _setLayerVisibleAttr: function(visible) {
        this._set("layerVisible", visible);
        if (this._layerVisDijitButton && this._layerVisDijitButton.get("checked") !== visible) {
          this._layerVisDijitButton.set("checked", visible);
        }
      },
      layerWidget: undefined,
      isGroupLayer: false,
      _watchHandles: undefined,
      _onHandles: undefined,
      _layerItems: undefined,

      _previousProgressPercentage: -1,
      _previousProgressVisible:null,

      /*
        (auto injected into properties by postscript function) 
        params = {
          map: mapInstance,
          layer: layerInstance,
          layerWidget: containerLayerWidget
        }
        srcNodeRef = domNode (optional)
      */
      constructor: function(params, srcNodeRef) {
        this._watchHandles = [];
        this._onHandles = [];
        this._layerItems = [];
      },

      // called by dijit after constructor and after postscript, 
      // before rendering occurs, and before any dom nodes are created. 
      // Used for changing the instance’s properties before the widget is rendered    
      postMixInProperties: function() {

      },

      postCreate: function() {
        this.set("layerTitle", this.layer.title || this.layer.id);
        var h = this.layer.watch("title", function(change) {
          this.set("layerTitle", this.layer.title);
        }.bind(this));
        this._watchHandles.push(h);

        this.set("layerVisible", this.layer.visible);
        var h1 = this.layer.watch("visible", function(change) {
          this.set("layerVisible", change);
        }.bind(this));
        this._watchHandles.push(h1);

        if ((this.parentGroup === undefined)||(this.layer.listMode === "hide")) {
          domClass.add(this.domNode, this.layer.listMode);
        }
        if (this.parentGroup && this.parentGroup.visibilityMode === "exclusive") {
          this._layerVisDijitButton = new RadioButton({
            name: this.parentGroup.id + "_radiogroup_" + this.id,
            checked: this.layerVisible
          }, this.layerVisInputCheckbox);
          this._layerVisDijitButton.domNode.children[0].style.display = 'none';
        } else {
          this._layerVisDijitButton = new CheckBox({
            checked: this.layerVisible
          }, this.layerVisInputCheckbox);
        }

        var h2 = on(this._layerVisDijitButton, "change", this._layerVisInputCheckboxChange.bind(this));
        this._onHandles.push(h2);

        var h3 = this.layer.watch("visibilityMode", function(change) {
          this.layerWidget.reload();
        }.bind(this));
        this._watchHandles.push(h3);

         var h4 = this.layer.watch("listMode", function(change) {
          this.layerWidget.reload();
        }.bind(this));
        this._watchHandles.push(h4);

        this._init();
      },
      _addLayerItem: function(layer, idx) {
        var it = new LayerItem({
          map: this.map,
          view: this.view,
          layer: layer,
          layerWidget: this.layerWidget,
          parentGroup: this.layer,
          parentLayerItem: this
        });
        it.placeAt(this.layersDomNode, idx);
        this._layerItems.push(it);
      },
      _removeLayerItem: function(layer) {
        for (var i = this._layerItems.length - 1; i >= 0; i--) {
          if (this._layerItems[i].layer === layer) {
            this._layerItems.splice(i, 1);
            this._layerItems[i].destroy();
            break;
          }
        }
      },
      _init: function() {

        if (this.isGroupLayer) {
          if (this.layer.listMode !== "hide-children") {
            this._initGroupLayerItems();
          }
        }

        var activate = function() {
          if (this.layer.fullExtent) {
            domClass.remove(this.layerFrameButton, "inactive");
          }
        }.bind(this);

        if (this.layer.loaded || this.layer instanceof GroupLayer) {
          activate();
        } else {
          this.layer.then(function(response) {
            activate();
          }.bind(this));
        }

      },
      _initGroupLayerItems: function() {
        if (this.isGroupLayer) {
          this.layersDomNode = domCtr.create("div", {
            className: "layers"
          }, this.domNode);
          domCtr.create("div", {
            className: "layersLine"
          }, this.layersDomNode);

          var h = on(this.layer, "layer-add", function(e) {
            this.layerWidget.reload();
          }.bind(this));

          var h1 = on(this.layer, "layer-remove", function(e) {
            this.layerWidget.reload();
          }.bind(this));

          var h2 = on(this.layer, "layer-reorder", function(e) {
            this.layerWidget.reload();
          }.bind(this));

          this._onHandles.push(h);
          this._onHandles.push(h1);
          this._onHandles.push(h2);

          for (var i = this.layer.layers.get("length")-1; i >= 0 ; i--) {
            var layer = this.layer.layers.getItemAt(i);
            this._addLayerItem(layer);
          }

          if (this.layer.layers.get("length") === 0){
            domClass.add(this.layersDomNode,"emptyPlaceholder");
          }
        }
      },

      destroy: function() {
        this._watchHandles.forEach(function(h) {
          h.remove();
        });

        this._onHandles.forEach(function(h) {
          h.remove();
        });

        this._layerItems.forEach(function(l) {
          l.destroy();
        });

        this._watchHandles.length = 0;
        this._onHandles.length = 0;
        this._layerItems.length = 0;

        this._layerVisDijitButton.destroy();

        domCtr.empty(this.domNode);
        domCtr.destroy(this.domNode);
      },

      _layerVisInputCheckboxChange: function(checked) {
        if (this.layer.visible !== checked) {
          this.layer.visible = checked;
        }
      },
      
      _layerFrameButtonClick: function() {
        if (this.layer.fullExtent) {
          this.view.animateTo({
            target: this.layer.fullExtent,
            tilt: this.view.camera.tilt,
            heading: this.view.camera.heading
          });
        }
      }
    });
    return LayerItem;

  }
);
