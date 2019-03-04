<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
<br>
<br>
<br>
### Building Web Apps that Integrate with Your Portal
<br>
 Heather Gonzago and Kelly Hutchins

----

### **Agenda**

* General AGO/Portal overview
* Inside web map/scenes
* Adding ArcGIS Online content to a JavaScript application
* Working with secured ArcGIS Online items in a JavaScript application

----

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
### SDK Resources

<div style="float:left;">
- <a href="https://developers.arcgis.com/javascript/latest/guide/working-with-platform/index.html" target="_blank">
Guide topic
</a>
<br>
- <a href="https://developers.arcgis.com/javascript/latest/sample-code/intro-widgets/index.html?search=Portal">Samples</a>
</div>
<img src="images/sdk.png" style="float:right;"/>

----
### Step 1: Setup Authentication
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#registerOAuthInfos" target="_blank">Register the app</a>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
// Create OAuthInfo
  var oauthInfo = new OAuthInfo({
    appId: "enterAppIdHere" // registered app id on AGO
  });
esriId.registerOAuthInfos([oauthInfo]); 
</code></pre>
</br>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#getCredential" target="_blank">Sign in and get credential</a>
</br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
  credential = await IdentityManager.getCredential(portalUrl);
</code></pre>
</br>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#getCredential" target="_blank">Sign out and destroy credentials</a>
</br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
IdentityManager.destroyCredentials();
</code></pre>

----

### Register an app
- <a href="https://www.arcgis.com" target="_blank">ArcGIS Online</a>
- <a href="https://developers.arcgis.com/applications" target="_blank">ArcGIS for Developers site</a>
</br>
<a href="https://developers.arcgis.com/documentation/core-concepts/security-and-authentication" target="_blank">
  <img style="float: center;" src="images/developersauthentication.png">
</a>

----
### **OAuth2: Identity Manager**
- Authentication functionality provided via the Identity Manager
- Handles the complexity of calling endpoints and parsing tokens
- Example: JS API Identity Manager
  - <span style="color:cyan">`OAuthInfo`</span> class -> pass in registered <span style="color:cyan">`App ID`</span>
  - Pass this information to the Identity Manager
<img style="float: bottom;" src="images/IdentityManager.png">

----
### Authentication
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-IdentityManager.html#checkSignInStatus">checkSignInStatus</a>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
//  Is the user already logged in?
IdentityManager.checkSignInStatus(portalUrl).always((info) => {
  ..  
});
</code></pre>
* returns <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-Credential.html#">Credential</a>

----

### **Web Maps**

<<<<<<< HEAD
<a href="http://arcg.is/04qqaW" target="_blank">
  <img src="images/webmap.png" alt="Webmap">
</a>

----
### Step 2: Display a map
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html" target="_blank">2D:esri/WebMap</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-WebScene.html" target="_blank">3D:esri/WebScene</a>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim>
// Step 2 create simple 3d (or 2d map)
const map = new WebMap({
  portalItem: {
    id: "7761d81ff08e45f2a7f27997e8d3e92d"
  }
});
const view = new SceneView({
  map,
  zoom: 4,
  center: [-98, 35],
  container: "viewDiv"
});
</pre></code>

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

<a href="Demos/CreateLayerPortalItem.html" target="_blank">
  <img src="images/demobyportalitem.png">
</a>

----

### **Portal API**

<a href="https://developers.arcgis.com/rest/users-groups-and-items/working-with-users-groups-and-items.htm" target="_blank">
<img src="images/PortalAPIDoc.png" style="float: bottom;">
</a>

----

### **WebMap and Portal classes**


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
- Track app usage
- Easy to access resources secured with token-based authentication, e.g. premium credit-based services


----

### **Demo: Access private data in a web application**

----

### **Demo: Register an application for Oauth use**

----

### **Access credit-based services**

- Application handles it for you, no need to sign in
- Proxy file with saved credentials
  - Hosted proxy file provided by Esri OR
  - Host your own proxy file
  - Esri proxy -> https://github.com/Esri/resource-proxy
    - DotNet, JSP, and PHP
  
----


<!-- .slide: data-background="../reveal.js/img/bg-rating.jpg" -->

## Questions?

**Help us to improve** by filling out the survey

![Survey](images/survey-slide.png)

----
