<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
</br>
</br>
## Tips and Tricks for Developing and Debugging Apps
Kelly Hutchins and Heather Gonzago

----

### **Overview**
</br>
<img style="float: right;" src="images/introMan.png">


- Setting up your dev environment
- JSAPI resources and tips 
- Browser tips and tools 
- … and more 


----


<!-- .slide: data-background="../reveal.js/img/bg-3.png" -->
</br></br>
## **Dev environment setup**

----


### **Local web server**

</br>
<img style="float: right;" src="intellisensemages/localWebServer.png">

- Visit [http://localhost](http://localhost)
- Setup IIS or Apache 
- Lightweight http server 
- http-server 
- Express 
- Browser extensions 

----

### **Code Assist**
</br>
<a href="https://github.com/kellyhutchins/DS2018-TipsAndTricks/blob/master/CodeAssistDemos/javascript-demo/README.md" target="_blank">
  <img style="float: right;" src="images/intellisense.png">
</a>

- TypeScript
- JS using Babel


----

### **Emmet**
</br>
  <img style="float: right;" src="images/emmet.png">

- Save keystrokes 
- HTML, CSS abbreviations 
- [Plug-in page](https://emmet.io/download/) 


----

### **Snippets**
</br>
  
<img style="float: right;" src="images/snippet.png">

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

### **Debugging:  Breakpoints**

</br>

</br>
  <img style="float: right;" src="images/debugger.png">

- Various ways to pause code
- Debugger;
- Blackboxing

----

### ** Debugging: Network requests**

</br>
<img style="float: right;" src="images/network.png">

- Records all network requests
- Helps in troubleshooting, e.g.
  - Printing issues
  - Queries

----

### **Dev Tool Workspaces**

- <a href="https://developers.google.com/web/tools/setup/setup-workflow" target="_blank">FileSystem tab</a>
  - Targets the dev environment directly
  - Direct access to development project resources
  - Good if want to build a site
- Local overrides
  - Targets remote website = no direct access to dev environment
  - Overrides network resources
  - Persists changes of network resources locally
  - Good for reconstructing websites

----

### **Mobile emulation**

</br>

</br>
<a href="https://developers.google.com/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports" target="_blank">
  <img style="float: right;" src="images/mobile.png" width="900" height="395">
</a>

- Mobile emulation
- Throttling 
- Sensors - geolocation


----

### **Custom formatters**

</br>

- <a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview" target="_blank">Controls how object values display</a>
</br>
<a href="https://github.com/ycabon/arcgis-js-api-devtools" target="_blank">
  <img style="float: center;" src="images/formatters.png">
</a>

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
## **JSAPI FAQ**

----

### **Common questions/issues**

- Module Order
- Mixed content errors
- CORS enabled servers
- Use of proxies

- Narrow the problem down
  - App specific
  - API specific
  - Server-side issue
  - Are any 3rd party resources involved?

----

### **3.x to 4.x Feature Matrix**

<a href="https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html" target="_blank">
 <img style="float:right;" src="images/featurematrix.png">
</a>
- Is this functionality in 4.x?
- 4.x equivalency in 3.x?

----

### **when/then**

<img style="float:center;" src="images/whenthen.png">
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
<script>
var dojoConfig = {
  has: {
    "esri-promise-compatibility": 1
  }
};
</script>
</code></pre>
</br>
Check out our blog -> <a href="https://blogs.esri.com/esri/arcgis/2017/12/14/making-better-promises" target="_blank>">https://blogs.esri.com/esri/arcgis/2017/12/14/making-better-promises</a>


----

### **Extent changed **

</br> 
- <a href="https://community.esri.com/thread/207901-in-4x-how-to-catch-extent-change-event" target="_blank">4.x extent changed event</a> 

<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 75%;"><code data-trim>
watchUtils.whenFalse(view, 'stationary', function(evt){
  if(!view.stationary){
    watchUtils.whenTrueOnce(view, 'stationary', function(evt){
      console.log(view.extent);
    });
   } 
   else {
     watchUtils.whenFalseOnce(view, 'interacting', function(evt){
       console.log(view.extent);
     });
   }
})
</code></pre>

----

### **Ago Assistant**

<a href="https://ago-assistant.esri.com/" target="_blank">
 <img style="float:center;" src="images/agoassistant.png">
</a>


----

<!-- .slide: data-background="../reveal.js/img/bg-final.jpg" -->

## Questions?

**Help us to improve** by filling out the survey

![Survey](Images/survey-slide.png)

----
