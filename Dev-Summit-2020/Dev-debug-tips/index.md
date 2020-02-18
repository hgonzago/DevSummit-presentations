<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br>
</br>
## Tips and Tricks for Developing and Debugging Apps
Kelly Hutchins and Heather Gonzago

----

Ever have one of those days where nothing seems to work?
<img style="height: 625px;" src="images/frustrated.jpeg">

----

You keep staring at the same code, but you have nothing...
<img src="images/code-flying.jpeg">

----

Debugging tools === Productive programmers
</br></br>
<img src="images/debug-happy.png">

----

<!-- .slide: data-background="../reveal.js/img/bg-4.png" -->
</br>
</br>

### **Slides and demos can be accessed at:**

## <a href="https://github.com/hgonzago/tips-tricks-webinar" target="_blank">https://github.com/hgonzago/tips-tricks-webinar</a>

----

### **Things we'll discuss**
</br>
- Setting up your development environment
- Troubleshoot web application
- Popular browser developer tools
- Give us your questions

----

<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br></br>
## **Setting up your development environment**

----

### **JavaScript IDE/Source code editor**
</br>
- Lots of choices
  - Atom, Brackets, WebStorm, Sublime, VSCode
- Debugging support
- Extensions

----

### Extensions
 - Beautify, Prettier 
 - EsLint
 - Bracket colorizer
 - Themes,
 - GitLens
    

----

### Extension Demo

<img src="./images/pretty.gif" />

----


### Programming font
</br>
  - Ligatures
  - Fira Code, Hasklig, Cascadia  

  <img src="images/ligatures.png"/>

----

### **Code snippets**
</br>
<img style="float:right" src="https://github.com/Esri/arcgis-js-vscode-snippets/raw/master/./images/code-snippets.gif" alt="example">
- Templates for reuseable code
- [ArcGIS API for JavaScript snippets](https://marketplace.visualstudio.com/items?itemName=Esri.arcgis-jsapi-snippets&ssr=false#overview)
- [Snippet generator](https://pawelgrzybek.com/snippet-generator/)

----

### ** Emmet**
- Emmet
 - Save keystrokes
 - HTML, CSS abbreviations
 - [Plug-in page](https://emmet.io/download/)


----

### **TypeScript/Babel**
</br>
<a href="./Demos/babel-demo/readme.md" target="_blank">
  <img style="float: right; width:761px; height:447px" src="images/intellisense.png">
</a>
- Code assist
- ES6
- <a href="https://developers.arcgis.com/javascript/latest/guide/typescript-setup/" target="_blank">TypeScript setup</a>

----


### **Local web server**
</br>
- Setup IIS or Apache
  - Visit [http://localhost](http://localhost)
- Local dev server with live reload:
 - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
 - [local-web-server](https://www.npmjs.com/package/local-web-server)
 - [http-server](https://www.npmjs.com/package/http-server)
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
----

### ** Starter App **
</br>

<a target="_blank" href="https://jsapi-414-template-app.surge.sh/"><img style="float: right; width:761px; height:447px" src="images/cliapp.png">
</a>
- TypeScript
- WebPack
- [ArcGIS API JS Template App](https://github.com/odoe/jsapi-cli-template-app)

----

<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br></br>
## **Troubleshooting your web application**

----

### **Narrow down the problem**
</br>
<img style="float: right"; src="images/onion.jpg">

- Is the problem with how the code is written?
- Is the issue on the client (API) or server?
- Is there a performance issue?
- Is the issue with the data?

----

<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
## **Browser developer tools**

<img style="width: 60%; margin: none; background: none; border: none" src="images/chrome-dev-tools.png">

----
<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
### **Debugging: Code issues**
</br>
- Common examples of application-level problems:
  - Modules out of order
  - View, Map, Layer not ready
  - Typos (yes, it happens quite often)

----
<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
### Modules out of order

Multiple errors can stem from wrong module order
<img src="images/module-order.png">
<img src="images/module-order-2.png">

----
<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
### Not getting the results you expect

- Has the view containing the map fully loaded before executing code?
- Has the <a href= "https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-layers" target="_blank">layer</a> fully loaded before performing specific functions?
- Wrap problem areas in <code>try/catch</code> statements for troubleshooting

<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
// Create a MapView instance (for 2D viewing)
var view = new MapView({
  map: myMap,  // References a Map instance
  container: "viewDiv"  // References the ID of a DOM element
});

view.when(function(){
 // All the resources in the MapView and the map have loaded. Now execute additional processes
}, function(error){
 // Use the errback function to handle when the view doesn't load properly
 console.log("The view's resources failed to load: ", error);
});

</code></pre>

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
### Demo: Debugging code using breakpoints

<img src="images/breakpoints.gif">

----

### ** Debugging: Network requests**

</br>
<img style="float: right; border: none;" src="images/network.png">

- Records all network requests
- Inspect network traffic, e.g. 
  - Search widget not displaying properly
  - GP task not executing as expected
  - Querying layer features
  
----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br>
</br>
### Demo: Network requests

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
### Console and CSS 

----


<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
### Console: Log Messages 
  - Log your own messages
  - Warning message logged by JSAPI
  <a href="./Demos/js-demo/index.html"><img src="images/consoleerror.png"/></a>


----

<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
### Console: Run JavaScript 

 - Execute JavaScript
 - Check values of objects at an app breakpoint 
  
  <a target="_blank" href="https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/live/index.html"><img src="images/latlong.png"/></a>

----


<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
### CSS: Color Themes 
</br>
- Detect user color scheme preferences 
  - CSS media feature (light, dark, no-preference)
- Emulate via dev tools
  
  <a href="./Demos/js-demo/index.html"><img src="./images/theme-prefs.png" style="float:right;"> </a>
----
<!-- .slide: data-background="../reveal.js/img/bg-2.png" -->
#### CSS: Inspect Styles  
</br>
- Inspect element css 
- View classes applied to selected element
<img src="./images/computed-css.png">
- <a target="_blank" href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html">View widget styles</a>

----

<!-- .slide: data-background="../reveal.js/img/bg-4.png" -->
</br>
## Questions?
</br>
</br>
- [https://github.com/hgonzago/tips-tricks-webinar](https://github.com/hgonzago/tips-tricks-webinar)
- [ArcGIS API for JavaScript Snippets](https://github.com/hgonzago/tips-tricks-webinar)
- [ArcGIS API for JavaScript Guide topic - TypeScript setup](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/)


