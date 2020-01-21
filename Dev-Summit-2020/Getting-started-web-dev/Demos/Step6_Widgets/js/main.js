require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/AreaMeasurement2D"
], function(WebMap, MapView, Legend, DistanceMeasurement2D, AreaMeasurement2D) {

  var activeWidget = null;

  var map = new WebMap({
    portalItem: {
      // autocast
      id: "b45ec95aeeb743399dd4b557abd20ee2"
    }
  });
  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
    center: [-99.14725260912257, 36.48617178360141]
  });
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/
  view.when(function() {
    var privateSchoolsPoly = map.layers.getItemAt(0);
    // Step 1: Create the widget
    var legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [
        {
          layer: privateSchoolsPoly,
          title: "Private school enrollment"
        }
      ]
    });
    
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-left");
    view.ui.add("topbar", "top-right");

    // Step 4: Add logic so that users can switch between the distance and area
    // measurement widgets
    document.getElementById("distanceButton").addEventListener("click",
        function () {
          setActiveWidget(null);
          if (!this.classList.contains('active')) {
            setActiveWidget('distance');
          } else {
            setActiveButton(null);
          }
        });

      document.getElementById("areaButton").addEventListener("click",
        function () {
          setActiveWidget(null);
          if (!this.classList.contains('active')) {
            setActiveWidget('area');
          } else {
            setActiveButton(null);
          }
        });

      function setActiveWidget(type) {
        switch (type) {
          case "distance":
            activeWidget = new DistanceMeasurement2D({
              view: view
            });

            // skip the initial 'new measurement' button
            activeWidget.viewModel.newMeasurement();

            view.ui.add(activeWidget, "top-right");
            setActiveButton(document.getElementById('distanceButton'));
            break;
          case "area":
            activeWidget = new AreaMeasurement2D({
              view: view
            });

            // skip the initial 'new measurement' button
            activeWidget.viewModel.newMeasurement();

            view.ui.add(activeWidget, "top-right");
            setActiveButton(document.getElementById('areaButton'));
            break;
          case null:
            if (activeWidget) {
              view.ui.remove(activeWidget);
              activeWidget.destroy();
              activeWidget = null;
            }
            break;
        }
      }

      function setActiveButton(selectedButton) {
        // focus the view to activate keyboard shortcuts for sketching
        view.focus();
        var elements = document.getElementsByClassName("active");
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove("active");
        }
        if (selectedButton) {
          selectedButton.classList.add("active");
        }
      }
  });
});
