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
  - This session focuses on version 4.x
  - Concepts remain similar between versions 3.x and 4.x 
  - https://github.com/hgonzago/DevSummit-presentations

---

### **Where do I begin?**
<a href="https://developers.arcgis.com/javascript/">
<img src="Images/landingPage.png" alt="JavaScript landing page" width="880" height="600">
</a>

---

### **Which version of the API is best?**
<a href="https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html">
<img src="Images/apiVersion.png" alt="API functionality matrix" width="700" height="600">
</a>

---

### **Developer Setup**
[![IDEs](images/ides.png)](https://www.slant.co/topics/1686/~javascript-ides-or-editors)

---

### **JSAPI Resources**
<a href="https://github.com/Esri/jsapi-resources">
<img style="float: right;" alt="JSAPI resources" src="Images/jsapiResources.png" width="790" height="600">
</a>
 - Includes
   - JSHint file
   - TypeScript definition file
   - Build tools, e.g. Bower
   - OAuth popup callback page

---

### **Get the API**
 - [CDN](https://developers.arcgis.com/javascript/latest/guide/get-api/index.html)
 - Custom builds
 - [Download builds](https://developers.arcgis.com/downloads/)
</br>
</br>
 <pre><code data-trim>
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt;
&lt;script src=&quot;https://js.arcgis.com/4.6/&quot;&gt;&lt;/script&gt;
</code></pre>

---

### CSS
- [Main.css](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)
  - Contains styles for entire API
   <pre><code data-trim>
   &lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt;
   </code></pre>
- View.css
  - Smaller in size but better choice if only needing basic CSS (maps, widgets, etc.)
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
<img style="float: center;" src="Images/combinedFile.png">

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
 - [Various layer types](https://developers.arcgis.com/javascript/latest/api-reference/index.html#modules-in-esri-layers)
1. Load module </br>
2. Create layers </br>
3. Set properties </br>
4. Add to map or scene
 - Basic steps remain the same

---

### **Properties**
- [Properties](https://developers.arcgis.com/javascript/latest/guide/working-with-props/index.html) can be set in constructor
- No need for a bunch of get/set statements
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 50%;"><code data-trim> 
view.center = [-100, 40];
view.zoom = 6;
map.basemap = "streets";
</code></pre>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 50%;"><code data-trim> 
var map = new Map({
    basemap: "streets",
    layers: [cities, roads]
});
view.zoom = 6;
map.basemap = "streets";
</code></pre>
---

### **Watch for property changes**
- [Watch](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#watch) for changes </br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 99%;"><code data-trim>
layer.watch("loadStatus", function(status) {// do something});
</code></pre></br>
- Can also use [esri/core/watchUtils](https://developers.arcgis.com/javascript/beta/api-reference/esri-core-watchUtils.html) utility methods
- See this in action at [Watch for Changes](https://developers.arcgis.com/javascript/latest/sample-code/watch-for-changes/index.html) sample
---

### **Demo: Add layer to sample app**

Add pic of demo with layers and link to it

---

### **Renderers**
- [Define](https://developers.arcgis.com/javascript/latest/sample-code/get-started-visualization/index.html) a set of symbols to use for the layer
- Sets the rules on how the symbols are used
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
- Renderers use symbology, e.g. points, lines, polygons
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
- No need to *Require[]* a property
</br>
- How do you check if a property supports [autocasting](https://developers.arcgis.com/javascript/latest/guide/autocasting/index.html)? </br>
   Look for *Autcast* label in SDK's API Reference </br>
   [Create a layer from portal item](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-portal) sample shows this


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
- FeatureLayer has associated [popupTemplate](https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html) property
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

- Reduces coding effort
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
- User forums, e.g. GeoNet, StackExchange, Spatial Community in Slack, etc.

---

### **Additional Sessions**

Fill this part in

---

### **Survey??**

do we have a survey slide?

---

 <!-- .slide: data-background="../../reveal.js/img/bg-final.jpg" -->
## Thank you

---

