define(["dojo/Evented", "dojo/_base/declare", "dojo/_base/lang", "dijit/_WidgetBase", "dojo/on", "dojo/dom", "dojo/dom-style", "dojo/dom-class", "dojo/dom-construct", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/layout/TabContainer", "dojo/Deferred", "dojo/window"], function (
Evented, declare, lang, _WidgetBase, on, dom, domStyle, domClass, domConstruct, BorderContainer, ContentPane, TabContainer, Deferred, win) {
    var Widget = declare("application.Drawer", [_WidgetBase, Evented], {
        options: {
            showDrawerSize: 850,
            borderContainer: null,
            contentPaneCenter: null,
            contentPaneSide: null,
            toggleButton: null,
            mapResizeTimeout: 300,
            mapResizeStepTimeout: 25,
            config: null
        },
        // lifecycle: 1
        constructor: function (options) {
            // mix in settings and defaults
            var defaults = lang.mixin({}, this.options, options);
            // properties
            this.set("showDrawerSize", defaults.showDrawerSize);
            this.set("borderContainer", defaults.borderContainer);
            this.set("contentPaneCenter", defaults.contentPaneCenter);
            this.set("mapResizeTimeout", defaults.mapResizeTimeout);
            this.set("mapResizeStepTimeout", defaults.mapResizeStepTimeout);
            // classes
            this.css = {
                toggleButton: "toggle-grey",
                toggleButtonSelected: "toggle-grey-on",
                drawerOpen: "drawer-open",
                drawerOpenComplete: "drawer-open-complete"
            };
        },
        // start widget. called by user
        startup: function () {
            this._init();

        },
        // connections/subscriptions will be cleaned up during the destroy() lifecycle phase
        destroy: function () {
            this._removeEvents();
            this.inherited(arguments);
        },
        resize: function () {

            // resize border container
            if (this._borderContainer) {
                this._borderContainer.layout();
            }

            // drawer status resize
            // this.emit("resize", {});
        },
        /* ---------------- */
        /* Public Events */
        /* ---------------- */
        // load
        // resize
        // toggle
        /* ---------------- */
        /* Public Functions */
        /* ---------------- */
        toggle: function (add) {

            // deferred to return
            var def = new Deferred();
            // true if drawer is opened
            var currentlyOpen = domClass.contains(document.body, this.css.drawerOpen);

            // if already open or already closed and asked to do the same
            if ((currentlyOpen && add === true) || (!currentlyOpen && add === false)) {
                // return
                return def.promise;
            }


            // whether drawer is now opened or closed
            var nowOpen;

            // if add is set
            if (typeof add !== "undefined") {
                nowOpen = domClass.toggle(document.body, this.css.drawerOpen, add);
            } else {
                nowOpen = domClass.toggle(document.body, this.css.drawerOpen, !currentlyOpen);
            }

            // remove shadow
            domClass.remove(document.body, this.css.drawerOpenComplete);
            // if steps animation exists
            if (this._animationSteps) {
                clearInterval(this._animationSteps);
                this._animationSteps = null;
            }
            // resize during animation
            this._animationSteps = setInterval(lang.hitch(this, function () {
                // resize border container
                this.resize();
            }), this.get("mapResizeStepTimeout"));
            // remove timeout if exists
            if (this._animationTimeout) {
                clearTimeout(this._animationTimeout);
                this._animationTimeout = null;
            }
            // wait for animation to finish
            this._animationTimeout = setTimeout(lang.hitch(this, function () {
                // remove shown drawer
                this._checkDrawerStatus();
                // stop resizing container
                clearInterval(this._animationSteps);
                this._animationSteps = null;
                // now drawer is open
                if (nowOpen) {

                    // add shadow
                    domClass.add(document.body, this.css.drawerOpenComplete);
                }
                // return
                def.resolve();
            }), this.get("mapResizeTimeout"));
            // return when done
            return def.promise;
        },
        /* ---------------- */
        /* Private Functions */
        /* ---------------- */
        _removeEvents: function () {
            if (this._events && this._events.length) {
                for (var i = 0; i < this._events.length; i++) {
                    this._events[i].remove();
                }
            }
            this._events = [];
            // destroy content panes
            if (this._contentPaneCenter) {
                this._contentPaneCenter.destroy();
            }
            if (this._contentPaneSide) {
                this._contentPaneSide.destroy();
            }
            // destroy content pane
            if (this._borderContainer) {
                this._borderContainer.destroy();
            }
        },
        _init: function () {
            // setup events
            this._removeEvents();
            // required nodes
            this._borderContainerNode = dom.byId(this.get("borderContainer"));
            this._contentPaneCenterNode = dom.byId(this.get("contentPaneCenter"));
            // all nodes present
            if (this._borderContainerNode && this._contentPaneCenterNode) {
                // outer container
                this._borderContainer = new BorderContainer({
                    design: "sidebar",
                    gutters: false
                }, this._borderContainerNode);
                // center panel
                this._contentPaneCenter = new ContentPane({
                    region: "center",
                    style: {
                        padding: 0
                    }
                }, this._contentPaneCenterNode);
                this._borderContainer.addChild(this._contentPaneCenter);
                // leading panel
                if (this.displayDrawer) {

                    this._contentPaneSide = new ContentPane({
                        region: "leading",
                        id: "cp_left",
                        style: {
                            padding: 0
                        }
                    }, domConstruct.create("div", {
                        "class": "content-pane-left"
                    }));
                    this._borderContainer.addChild(this._contentPaneSide);


                    //Add tabs for any enabled panels (Legend, side panel, desc)
                    var tabs = new TabContainer({
                        "id": "tabContainer",
                        "class": "tabs"
                    }, domConstruct.create("div", {}, "cp_left"));
                    var tab_count = 0;

                    if (this.config.legend) {
                        tab_count += 1;
                        var legend = new ContentPane({
                            id: "legend",
                            title: this.config.i18n.tools.legend.title,
                            selected: true
                        }, domConstruct.create("div"));
                        tabs.addChild(legend);
                    }
                    if (this.config.details) {
                        tab_count += 1;
                        var details = new ContentPane({
                            id: "details",
                            title: this.config.i18n.tools.details.title
                        }, domConstruct.create("div"));
                        tabs.addChild(details);
                    }
                    if (this.config.popup_sidepanel) {
                        tab_count += 1;

                        var sidepanel = new BorderContainer({
                            id: "popup",
                            title: this.config.i18n.tools.popup.title
                        }, domConstruct.create("div"));

                        var popup_content = new ContentPane({
                            region: "center",
                            id: "info_content"
                        }, domConstruct.create("div"));
                        sidepanel.addChild(popup_content);

                        //Popup Navigation info will go here 
                        var poupup_header = new ContentPane({
                            region: "top",
                            id: "info_header",
                            content: "<div class='no-select'>" + this.config.i18n.tools.popup.instructions + "</div><div id='popupNav'><div id='prev_nav' class='nav embed-icon-arrow-left'></div><div id='next_nav'class='nav embed-icon-arrow-right'></div><div id='nav_count'class='nav no-select'></div></div>"
                        }, domConstruct.create("div"));
                        sidepanel.addChild(poupup_header);
                        tabs.addChild(sidepanel);
                    }
                    domClass.add(tabs.domNode, "tab_" + tab_count);

                    tabs.startup();

                    domConstruct.create("div", {
                        innerHTML: "<div class='vertical-line'><div id='toggle_button' class='menu-button'></div></div>"
                    }, this._contentPaneCenterNode);
                    this._toggleNode = dom.byId("toggle_button");

                } else {
                    //add class to body
                    domClass.add(document.body, "no-title");
                }
                //close the drawer by default  
                domClass.add(document.body, "drawer-closed");


                // start border container
                this._borderContainer.startup();
                // drawer button
                if (this.displayDrawer) {
                    var toggleClick = on(this._toggleNode, "click", lang.hitch(this, function () {
                        domClass.remove(document.body, "drawer-closed");
                        this.toggle();
                    }));
                    this._events.push(toggleClick);
                }

                if (this.drawerOpen) {
                    this._toggleNode.click();
                } else {
                    //close the drawer 
                    domClass.add(document.body, this.css.drawerOpen);
                    this.toggle(false).always(lang.hitch(this, function () {
                        this.resize();

                    }));
                }
                // set loaded property
                this.set("loaded", true);
                // emit loaded event
                this.emit("load", {});

            } else {
                console.log("Drawer::Missing required node");
            }
        },

        _checkDrawerStatus: function () {
            // hamburger button toggle
            if (this.displayDrawer) {

                this._toggleButton();

            }
        },
        _toggleButton: function () {

            // if drawer is displayed
            if (domClass.contains(document.body, this.css.drawerOpen)) {

                if (domClass.contains(this._toggleNode), "embed-icon-close") {
                    domClass.replace(this._toggleNode, "embed-icon-close", "embed-icon-open");
                } else {

                    domClass.add(this._toggleNode, "embed-icon-open");
                }
                // has normal class
                if (domClass.contains(this._toggleNode, this.css.toggleButton)) {
                    // replace with selected class
                    domClass.replace(this._toggleNode, this.css.toggleButtonSelected, this.css.toggleButton);
                }
            } else {
                if (domClass.contains(this._toggleNode), "embed-icon-open") {
                    domClass.replace(this._toggleNode, "embed-icon-open", "embed-icon-close");
                } else {
                    domClass.add(this._toggleNode, "embed-icon-close");
                }
                // has selected class
                if (domClass.contains(this._toggleNode, this.css.toggleButtonSelected)) {
                    // replace with normal class
                    domClass.replace(this._toggleNode, this.css.toggleButton, this.css.toggleButtonSelected);
                }
            }
        }
    });
    return Widget;
});