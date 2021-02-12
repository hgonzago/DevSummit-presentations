<!-- .slide: data-background="../reveal.js/img/2021/dev-summit/bg-1.png" -->
<!-- .slide: class="title" -->
### Tips and Tricks for Developing and Debugging Apps
Kelly Hutchins and Heather Gonzago

----

### **Presentations accessible via GitHub**
👉 Slides & demos: <code>https://bit.ly/3absN00</code> 👈

----

### **Getting Started**

  - <a href="https://developers.arcgis.com/javascript/latest/get-started/" target="_blank">Getting started tutorial</a>
  - <a href="https://developers.arcgis.com/javascript/latest/tooling-intro/" target="_blank">AMD vs ES Modules</a>

  ![Table of differences between CDN and ES Modules](images/tooling.png)

----
### **Detailed Tutorials**

<a href="https://developers.arcgis.com/javascript/latest/add-a-feature-layer/" target="_blank">
<img alt="Add a feature layer tutorial" src="Images/tutorial.png">
</a>

----
### **Additional Info**

- <a href="https://odoe.net/blog" target="_blank">odoenet (Rene's blog)</a>

- <a href="https://www.esri.com/en-us/landing-page/product/2018/geodev-webinar-series/arcgis-api-for-javascript-tips-and-tricks-for-developing-and-debugging" target="_blank">GeoDev Webinar (older version of this session)</a>

----

### **esri community**

<a href="https://community.esri.com/t5/arcgis-api-for-javascript/ct-p/arcgis-api-for-javascript" target="_blank">
<img alt="esri community" src="Images/community.png">
</a>

----

### ArcGIS API for JavaScript snippets 

- <a href="https://marketplace.visualstudio.com/items?itemName=Esri.arcgis-jsapi-snippets" target="_blank">Available on Visual Studio Marketplace</a>
- <a href="https://github.com/Esri/arcgis-js-vscode-snippets" target="_blank">Contribute snippets to the GitHub repo</a>

  <iframe width=800 height=400 src="https://marketplace.visualstudio.com/items?itemName=Esri.arcgis-jsapi-snippets"></iframe>

----

<!-- .slide: data-background="../reveal.js/img/2021/dev-summit/bg-3.png" -->
<!-- .slide: class="title" -->

## API Tips


Tips on common questions people ask


----

### Custom Popup

  - [FetchFeatures](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Popup.html#fetchFeatures)
  
  [![popup in side panel](images/fetch-features.png)](https://developers.arcgis.com/javascript/latest/sample-code/widgets-feature-multiplelayers/live/)



----
### View events

  - [Handling Events](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#events)
  
  [![event explorer](images/event-explorer.png)](hhttps://developers.arcgis.com/javascript/latest/sample-code/event-explorer/)


----

### Constrain visible extent 

 - Use constraint geometry to 
  - Restrict map area
  - Limit search results 

  [Demo](demos/restrict_extent.html)


----

### Request interceptor 

  - [RequestInterceptor](https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html#RequestInterceptor)
    - Add headers
    - Changes before request is sent
    - Changes after request is sent but before returned to caller
    - Log error info for specfic layer errors

    [Real World Example](https://community.esri.com/t5/arcgis-api-for-javascript/how-to-use-a-key-in-an-esrirequest-call/m-p/298401)

----


### GoTo Errors 
  ![View goTo interrupted](images/goToError.png)
  <code>
      view.goTo({
        center: [-126, 49]
      })
      .catch(function(error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
  </code>

---- 

## Developer Tools


Demo cool features available in developer tools


----

### Light and dark theme

  - Detect user preferences using [<code>prefers-color-scheme</code>](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

  ![emulate color theme](images/prefers-color-scheme.png)

  [Demo](demos/detect_color_theme.html)

----


### Console: Warnings  
  
  ![renderable deprecation](images/console-deprecated.png)

  ![api warning](images/api-deprecated-message.png)

----


### Snippet  

  - Create code snippets to run in browser dev tools
  
  ![Code snippet to get lat and long](images/coords-snippet.png)


----


### Create Live Expression  

  - Get coordinates as you navigate the map
  
  ![Code snippet to get lat and long](images/live-expression.png)


----
### Sensors 

  - Modify current location and locale 
  
  [![View map in japanese](images/map-locale.png)](https://www.arcgis.com/apps/instant/media/index.html?appid=6df7442815404def91d9196515fa0768)


----
