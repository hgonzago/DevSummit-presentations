<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br>
</br>
## Tips and Tricks for Developing and Debugging Apps
Kelly Hutchins and Heather Gonzago

----

### **Overview**
</br>
<img style="float: right;" width="700px" src="images/developerintro.png">


- Developer Setup
- Browser tools and tricks
- ArcGIS API for JavaScript tips



----


<!-- .slide: data-background="images/computer.jpeg" -->
</br></br>

<h1 style="text-shadow: 2px 2px #fff;color:#333;">Developer Setup</h1>

----


### **Web Server**

</br>
<img style="float: right;" src="images/liveserver.png">

- IIS or Apache
- Lightweight http server
- Browser extensions

<aside class="notes">You may already have a web server installed visit http://localhost to test. If you don't have a web page setup Apache is pre-installed on mac and IIS is commonly used on windows. Alternatively you can setup a lightweight http server for testing. Lots of examples like http-server, Express and also browser extensions available.</aside>
----

### **Code Assist**
</br>
<a href="README.md" target="_blank">
  <img style="float: right;" src="images/intellisense.png">
</a>

- TypeScript
- JavaScript (Babel)


----

### **Emmet**
</br>
  <video width="600" height="400" controls>
   <source src="images/emmetdemo.mp4" type="video/mp4">
  </video>

- Save keystrokes
- HTML, CSS abbreviations
- [Plug-in page](https://emmet.io/download/)


----

### **Snippets**
</br>

  <video style="float:right;" width="600" height="400" controls>
   <source src="images/snippets.mp4" type="video/mp4">
  </video>

- Templates for common code
- Generate for VSCode, Sublime, Atom
- [Snippet generator](https://pawelgrzybek.com/snippet-generator/)
- Extensions for IDE to simplify


----

### **JSAPI Resources**

</br>
<a href="https://github.com/Esri/jsapi-resources" target="_blank">
  <img style="float: right;" src="images/jsapiResources.png">
</a>

- JSHint file
- TypeScript definition file
- Build tools, e.g. Bower
- OAuth Callback



----

### **Demo: Working with multiple files **

- CSS & JS in html
- Separate files
- [Web Map](https://developers.arcgis.com/javascript/latest/sample-code/webmap-basic/index.html)

----

### **Additional resources**


- <a href="https://odoe.net/blog/">odoenet</a>
- <a href="https://ralucanicola.github.io/code-snippets-arcgis-api-js/index.html">3D Code Snippets cheat sheet</a>
- <a href="https://github.com/Esri/arcade-expressions">Arcade expressions repo</a>

</div>

----
<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br></br>
## **Browser Dev Tools**

----

### **Browser Extensions **

- WhatFont
- JSON Viewer
- JavaScript and CSS Code Beautifier
- Awesome autocomplete for GitHub
- Wappalyzer
- Quick source viewer
- The list goes on and on …

----

### **Console:  Messages**
</br>
<a href="https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-collection/live/index.html"><img  width="600" height="400" src="images/console.png"/></a>
- Log info
- Messages from JSAPI



----
### **Debugging:  Pause code execution**

</br>
  <img style="float: right;" src="images/debugger.png">

- Breakpoints
- Debugger;

----

### ** Debugging: Network requests**

- Records traffic
- Inspect headers and response

</br>
<a href="https://developers.arcgis.com/javascript/latest/sample-code/geoprocessing-viewshed/live/index.html">
<img src="images/network.png">
</a>


----
### **Debugging:  CSS Inspection**
<div style="float:right;"><a href="https://developers.arcgis.com/javascript/latest/sample-code/geoprocessing-viewshed/live/index.html">
<img src="images/css.png">
</a></div>
Inspect iem to find info about:

- CSS class names
- Applied styles
- Color contrast
- Toggle pseudo element

----

### **Other stuff**

</br>
<a href="https://developers.google.com/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports" target="_blank">
  <img style="float: right;" src="images/mobile.png">
</a>

- Mobile emulation
- Throttling
- Sensors - geolocation

----

### **Accessibility**

- Audits
- Color Contrast
- Extensions
- Axe Coconut (similar to Chrome Canary or Firefox nightly)
- Axe a11y extension
- ChromeVox screen reader


----

<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br></br>
## **ArcGIS API for JavaScript FAQ **

----
### **Release Notes**
<a href="https://developers.arcgis.com/javascript/latest/guide/release-notes/index.html"><img src="images/releaseNotes.png"></a>
----
### **Reading the API Reference**

<a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList.html"><img src="images/api.png"</a>

<aside class="notes">Do a deep dive into how to read the api ref here. Point out requires, beta tag?, since, autocast, hide/show inherited properties, samples and additional info. For widgets look at scss and view model links.</aside>
----

### **3.x to 4.x Feature Matrix**

<a href="https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html" target="_blank">
 <img style="float:right;" src="images/featurematrix.png">
</a>
- Is this functionality in 4.x?
- 4.x equivalency in 3.x?

----
### **Module order matters**

<img src="images/moduleordercode.png">
<br>
<p>Console errors</p>
<img src="images/moduleordererror.png">


----

### **Mixed Content**

- Mixed content errors http/https
- [Automatically switched](https://developers.arcgis.com/javascript/latest/guide/release-notes/4.8/index.html#promote-secured-services)
<aside class="notes">Note: At 4.8 localhost was considered secure. This was changed at 4.9.</aside>
----

### **CORS and Proxy Guides **

 [CORS](https://developers.arcgis.com/javascript/latest/guide/cors/)<br>
 [Proxy](https://developers.arcgis.com/javascript/latest/guide/proxies/index.html)
----
### **Autocast **

</br>
<a href="https://developers.arcgis.com/javascript/latest/guide/autocasting/">
```
 var diamondSymbol = {
   type: "simple-marker",
   style: "diamond",
   color: [255,128,45],
   outline:{
     style: "dash-dot",
     color: [255,128,45]
   }
 };
```
</a>

----
### **Where did all the events go? **

</br>

- Watch properties
    ```
    .watch(property, callback)
    ```
- Works with nested properties
    ```
    .watch("basemap.title",function(){})
    ```
- [Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=watch-for-changes)
- [watchUtils](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html)

----

### ** Geolocation **

![Search Sample](images/httpssearch.png)

----

### **Troubleshooting Tips**

- Narrow the problem down
  - App specific
  - API specific
  - Server-side issue
  - Are any 3rd party resources involved?

----


### **Ago Assistant**

<a href="https://ago-assistant.esri.com/" target="_blank">
 <img style="float:center;" src="images/agoassistant.png">
</a>


----

<!-- .slide: data-background="../reveal.js/img/bg-final.jpg" -->

## Questions?

**Help us to improve** by filling out the survey

![Survey](images/survey-slide.png)

----
