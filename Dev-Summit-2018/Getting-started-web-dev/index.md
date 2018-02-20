<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
<br>
<br>
<br>
### Getting Started with Web Development 
### and the ArcGIS API for JavaScript
<br>
Heather Gonzago and Noah Sager

---

### **Agenda**
 - Setup
 - First steps
 - Working with layers
 - Symbols and renderers
 - Make the map interactive
 - Widgets

---

### **Presentations accessible via GitHub**
  </br>
  - This session focuses on version 4.x</br>
  </br>
  - Concepts remain similar between versions 3.x and 4.x</br>
  </br>
  - <a href="https://github.com/hgonzago/DevSummit-presentations" target="_blank">https://github.com/hgonzago/DevSummit-presentations</a>

---

### **Where do I begin?**
<a href="https://developers.arcgis.com/javascript/" target="_blank">
<img src="Images/landingPage_3.png" alt="JavaScript landing page" width="1200" height="656">
</a>

---

### **Which version of the API is best?**
<a href="https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html" target="_blank">
<img src="Images/Choose_Your_Own_Version.png" alt="API functionality matrix" width="1000" height="633">
</a>

---

### **Developer Setup**
<a href="https://www.slant.co/topics/1686/~javascript-ides-or-editors" target="_blank">
<img src="Images/ides.png" alt="IDEs" width="806" height="443">
</a>
---

### **JSAPI Resources**
<a href="https://github.com/Esri/jsapi-resources" target="_blank">
<img style="float: right;" alt="JSAPI resources" src="Images/jsapiResources_2.png" width="790" height="577">
</a>
 - Includes
   - JSHint file
   - TypeScript definition file
   - Build tools, e.g. Bower
   - OAuth popup callback

---

### **Get the API**
 - <a href="https://developers.arcgis.com/javascript/latest/guide/get-api/index.html#cdn" target="_blank">CDN</a>
 - Custom builds
 - <a href="https://developers.arcgis.com/downloads/" target="_blank">Download builds</a>
</br>
</br>
 <pre><code data-trim>
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt; 
&lt;script src=&quot;https://js.arcgis.com/4.6/&quot;&gt;&lt;/script&gt;
</code></pre>

---

### CSS
- <a href="https://developers.arcgis.com/javascript/latest/guide/styling/index.html" target="_blank"><b>Main.css</b></a> contains styles for entire API
   <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt;
   </code></pre>
- <b>View.css</b> is smaller in size but better choice if only needing basic CSS (maps, widgets, etc.)
  <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/view.css&quot;&gt;
   </code></pre>
- Themes
    <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/themes/theme-name/main.css&quot;&gt;
   </code></pre>
- Custom CSS (SASS)

---

### **First steps**
- How will app be written?
- Separate files or one combined file?
<img style="float: center;" src="Images/Step1_Combined.png">

---

### **Demo: Make a map**

Add picture of adding map

---

### **MapView**

Visualize data within Map or Scene
<pre><code data-trim>
var view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 12,
  center: [-117.168, 32.776]
});
</code></pre>
<pre><code data-trim>
var view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    heading: 210,
    tilt: 78,
    position: {
      x: -8249335,
      y: 4832005,
      z: 50.7,
      spatialReference: {
        wkid: 3857
      }
    }
  }
});
</code></pre>

---

### **Add layers**
<img style="float:right;" src="Images/add-layers.png">
 - <a href="https://developers.arcgis.com/javascript/latest/api-reference/index.html#modules-in-esri-layers" target="_blank">Various layer types</a>
1. Load module </br>
2. Create layers </br>
3. Set properties </br>
4. Add to map or scene</br>
</br>
 - Basic steps remain the same

---

### **Properties**
- No need for a bunch of get/set statements
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 50%;"><code data-trim> 
var map = new Map();
map.basemap = "streets";
map.ground = "world-elevation";
var view = new MapView();
view.center = [-100, 40];
view.zoom = 6;
</code></pre>
- <a href="https://developers.arcgis.com/javascript/latest/guide/working-with-props/index.html" target="_blank">Properties</a> can be set in constructor
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 50%;"><code data-trim> 
var map = new Map({
    basemap: "streets",
    ground: "world-elevation"
});
var view = new MapView({
    map: map, 
    center: [-100, 40], 
    zoom: 6
  });
</code></pre>
---

### **Watch for property changes**
- <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#watch" target="_blank">Watch</a> for changes </br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
layer.watch("loadStatus", function(status) {// do something});
</code></pre></br>
</br>
- Can also use <a href="https://developers.arcgis.com/javascript/beta/api-reference/esri-core-watchUtils.html" target="_blank">esri/core/watchUtils</a> utility methods</br>
</br>
- See this in action with the <a href="https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html" target="_blank">Watch for Changes</a> sample
---

### **Demo: Add layer to sample app**

Add pic of demo with layers and link to it

---

### **Renderers**
- <a href="https://developers.arcgis.com/javascript/latest/sample-code/get-started-visualization/index.html" target="_blank">Define</a> a set of symbols to use for the layer</br>
</br>
- Sets the rules on how the symbols are used</br>
</br>
- Basic coding pattern
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
var layerRenderer = new UniqueValueRenderer(); // Set the renderer
var featurelayer = new FeatureLayer({
    url: "featurelayer url",
    renderer: layerRenderer // pass in renderer to featurelayer using default properties
})
</code></pre>

---

### **Symbols**
- Renderers use symbology, e.g. points, lines, polygons</br>
</br>
- Set the renderer's symbol
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
var symbol = new SimpleMarkerSymbol({
    // set the properties
});
</code></pre>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
var renderer = new UniqueValueRenderer({
    defaultSymbol: symbol, // set symbol for renderer
    // provide anymore properties necessary
});
</code></pre>

---

### **Autocasting**
</br>
- No need to <b>Require()</b> the module</br>
</br>
- Look for the <img style="float: center;" src="Images/autocast-label.png"> label in SDK's API Reference</br>
</br>
- <a href="https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-portal" target="_blank">Create a layer from portal item sample </a> shows autocasting in action</br>
</br>
- Read more about <a href="https://developers.arcgis.com/javascript/latest/guide/autocasting/index.html" target="_blank">Autocasting</a> in the Guide</br>

---

### **Demo: Update a feature layer's renderer**
Add picture of demo


---

### **Map interaction using popups**
- Responds to mouse clicks
- Provides info on
  - feature attributes
  - location
  - search results
- Customizable

Add pic of popup from demo


---

### **PopupTemplate**
- View has associated popup, can set content here
- FeatureLayer has associated <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html" target="_blank">popupTemplate</a> property
- Position the popup using *dockOptions*
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
var popupTemplate = new PopupTemplate({
    title: "Title of the popup",
    content: [{
      // Set the content here
    }]
});
</code></pre>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
var featurelayer = new FeatureLayer({
    url: "url to the feature layer",
    outFields: ["*"],
    popupTemplate: popupTemplate,
    renderer: renderer
});
</code></pre>

---

### **Demo: Add a popup to the map**

Add a picture of the demo with the popup

---

### **Using web maps**

- Reduces coding effort</br>
</br>
- Retains all customizations with rendering, popups, etc. 
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
var map = new WebMap({
    portalItem: {
      id: "8444e275037549c1acab02d2626daaee" // Remember portalItem is autocasted
    }
});
</code></pre>

---

### **Demo: Add a web map to an application**

Show pic of demo app with link to it

---

### **Widgets**

- Encapsulates functionality
- Similar coding pattern
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
view.when(function){
    var featurelayer = map.layers.getItemAt(1);
    // 1. Create the widget
    var legend = new Legend({
      // 2. Specify properties for widget
      view: view,
      layerInfos: [{
          layer: featurelayer,
          title: "Name"
      }]
  });
    // 3. Add widget to the view UI
    view.ui.add(legend, "bottom-left");
});
</code></pre>

---

### **Demo: Add the Search widget to the application**

Add picture of the demo with link


---

### **Where can I get more info?**

- SDK Documentation
- Esri-related training and webinars
- JavaScript online training, free and not-so-free
- User forums, e.g. GeoNet, StackExchange, Spatial Community in Slack, etc.</br>
</br>
<a href="https://developers.arcgis.com/javascript/latest/guide/community/index.html" target="_blank">
<img style="float:bottom;" src="Images/Community.png" alt="Community" width="900" height="395">

---

### **Additional Sessions (Introduction)**

<a><img style="float:bottom;" src="Images/Introduction_Sessions.png" alt="Introduction_Sessions"</a>

---

### **Additional Sessions (Advanced)**

<a><img style="float:bottom;" src="Images/Advanced_Sessions.png" alt="Advanced_Sessions"</a>

---

### **Survey??**

do we have a survey slide?

---

 <!-- .slide: data-background="../../reveal.js/img/bg-final.jpg" -->
## Thank you

---

