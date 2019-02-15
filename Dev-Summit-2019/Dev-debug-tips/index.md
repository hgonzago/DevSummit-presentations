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
<img style="float: right;" src="images/localWebServer.png">

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
### **Other useful resources**


- Rene's blog
- Raluca's samples
- Arcade example repo

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

View console messages from JSAPI


----
### **Debugging:  Breakpoints**

</br>

</br>
  <img style="float: right;" src="images/debugger.png">

- Various ways to pause code (XHR, DOM etc)
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
### **Debugging:  CSS Inspection**

Inspect iem to find info about:

- CSS class names
- Applied styles
- Color contrast
- Toggle pseudo element

----

### **Other stuff**

</br>

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
## **JSAPI Specific **

----
### **Release Notes**

- Release notes and breaking changes
----
### **Reading the doc**

Understanding the API REF
Deep dive into the api ref and what things mean

- require statement
- beta tag  ???
- Since:
- Autocast
- Hide/show inherited properties
- See also: Samples and additional info
- For widgets look at scss and view model

----

### **3.x to 4.x Feature Matrix**

<a href="https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html" target="_blank">
 <img style="float:right;" src="images/featurematrix.png">
</a>
- Is this functionality in 4.x?
- 4.x equivalency in 3.x?

----
### **Module Order**

Order matters - add example here showing module order

----

### **Mixed Content**

- Mixed content errors http/https
- CORS/Proxy

----

### **Autocast **

</br>
When to autocast vs when to load module

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
