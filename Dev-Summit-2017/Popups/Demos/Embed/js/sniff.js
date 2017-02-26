define(["dojo/has"], function (has) { /*App capabilities*/
    has.add("search", function (g) {
        var search = g.config.search;
        return search;
    });
    has.add("scale", function (g) {
        var scale = g.config.scale;
        return scale;
    });
    has.add("zoom", function (g) {
        var zoom = g.config.zoom;
        return zoom;
    });
    has.add("basemap_toggle", function (g) {
        var basemap_toggle = g.config.basemap_toggle;
        return basemap_toggle;
    });
    has.add("basemap_gallery", function (g) {
        var basemap_gallery = g.config.basemap_gallery;
        return basemap_gallery;
    });
    has.add("maker_symbol", function (g) {
        var maker_symbol = (g.config.maker_symbol);
        return maker_symbol;
    });
    has.add("legend", function (g) {
        var legend = g.config.legend;
        return legend;
    });
    has.add("home", function (g) {
        var home = g.config.home;
        return home;
    });

    has.add("marker", function (g) {
        var marker = (g.config.marker !== null) ? true : false;
        return marker;
    });
    has.add("drawer", function (g) {
        var drawer = false;
        if (g.config.legend || g.config.details || g.config.popup_sidepanel) {
            drawer = true;
        }
        return drawer;
    });
    return has;
});