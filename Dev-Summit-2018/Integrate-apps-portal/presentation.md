<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
<br>
<br>
<br>
### Building Web Apps that Integrate with Your Portal
<br>
 Heather Gonzago and Kelly Hutchins

---

### **Agenda**

* General AGO/Portal overview
* Inside web map/scenes
* Adding ArcGIS Online content to a JavaScript application
* Working with secured ArcGIS Online items in a JavaScript application

---


### **Advantages of working with AGO/Portal**

</br>
<img style="float: right;" alt="ArcGIS Online/Portal" src="images/PortalIcon.png" width="453" height="344"/>

- Sharing and managing secure resources
- Data hosting
- Easy to leverage
- Less code
- Reusable
- Organize/Update content centrally 

----


### **Architecture: Apps + Content**

</br>
<img src="images/Architecture.png" alt="Architecture"/>

----

### **Content: Basic building block for Apps**
</br>

<img src="images/Content-diagram.png" alt="Content"/>

----

### **Web Maps**

<a href="http://arcg.is/04qqaW" target="_blank">
  <img src="images/webmap.png" alt="Webmap">
</a>

----

### **Web Scene**

<a href="http://jsapi.maps.arcgis.com/home/webscene/viewer.html?webscene=a5e17e4ff0544ba8adb26617a6e1bbfd" target="_blank">
  <img src="images/webScene.png" alt="WebScene">
</a>

----


### **ID: Unique Identifier**

<img style="float: center;" src="images/webmap-id.png">


----


### **Web map & scenes: JSON information & data**
</br>
<a href="http://jsapi.maps.arcgis.com/sharing/rest/content/items/c6bac25632d646758823daf07216dda1?f=pjson" target="_blank">
  <img  src="images/itemdetails.png">
</a>
<a href="http://jsapi.maps.arcgis.com/sharing/rest/content/items/c6bac25632d646758823daf07216dda1/data?f=pjson" target="_blank">
  <img src="images/iteminfo2.png">
</a>

----

### **Demo: Inside the web map**


<a href="http://jsapi.maps.arcgis.com/home/item.html?id=c6bac25632d646758823daf07216dda1" target="_blank">
  <img width="600" src="images/DataResponseDevTools.png" style="float: left;">
  <img width="600" src="images/agoassistant.png">
</a>


----


### **Access a web map in an application**

<br>
<a href="Demos/LoadWebMap.html">
  <img src="images/Demo1-WebmapCode.png">
</a>

----

### **Access individual layer items**

* 4.x provides support for adding individual portal items into web application
* Call `Layer.fromPortalItem` and pass in the unique id layer item

<a href="Demos/CreateLayerPortalItem.html" target="_blank">
  <img src="images/layeritem.png" style="float: bottom;">
</a>

----

### **Demo**

Create application referencing <code>portalItem</code>

<a href="Demos/index.html" target="_blank">
  <img src="images/demobyportalitem.png">
</a>

----

### **Portal API**

<a href="http://resources.arcgis.com/en/help/arcgis-rest-api/#/Content_Root/02r300000093000000/" target="_blank">
<img src="images/PortalAPIDoc.png" style="float: bottom;">
</a>

----

### **WebMap and Portal classes**

<div style="text-align: left">

- esri/WebMap
- esri/WebScene
- esri/Portal
  - Portal
  - PortalFolder
  - PortalGroup
  - [PortalItem](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalItem.html)
  - PortalQueryParams
  - PortalQueryResult
  - PortalRating
  - PortalUser

----

### **Demo: Portal Rest API via `esriRequest` and API `PortalQueryParams` class**

----

### **Access secure content**

- Handles security so no need to write a bunch of code
- Detects private (unshared) data automatically
- If private, prompts for credentials
  - log-in via Identity Manager dialog prompt or
  - use the platform's provided OAuth framework to handle it for you

----
### **Benefits of using the platform security model**

- The web application does not have direct access to credentials
- Support for enterprise logins
- No need to sign in every time calls are made to a secure service
- Can track how the app is being used
- Easy to access resources secured with token-based authentication, e.g. premium credit-based services


----

### **Demo: Access private data in a web application**

----

### **Demo: Register an application for Oauth use**

----

### **Access credit-based services**

- Let the application handle this for you, no need to sign in to gain access
- Proxy file with saved credentials
  - Hosted proxy file provided by Esri OR
  - Host your own proxy file
  - One is provided by Esri at https://github.com/Esri/resource-proxy
  - Provided in DotNet, JSP, and PHP
  
----
### **Support for saving web scene**

----

### **Demo: Save a web scene**

----


## **Questions ????**


----

## Please take our survey
1. Download the Esri Events app and go to DevSummit
2. Select the session you attended
3. Scroll down to the "Feedback" section
4. Complete Answers, add a Comment, and Select "Submit"

![Submit Feedback](images/submit-feedback.png)


----

<!--.slide: data-background="../reveal.js/img/end.png" -->

----
