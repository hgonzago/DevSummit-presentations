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
- <a href="https://developers.arcgis.com/documentation/core-concepts/security-and-authentication">Developers site</a>
</div>
<img src="images/sdk.png" style="float:right;"/>

----
### Build a portal app from scratch

<a href="Demos/Step6" target="_blank">
  <img style="float: center;" src="images/finalapp.png">
</a>

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
  <img style="float: center;" src="images/registerapp.png">
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
<<<<<<< HEAD
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
=======
### **Demo: Add Authentication to app**
</br>
<a href="Demos/Step1" target="_blank">
  <img style="float: center;" src="images/userLoginDemo.png">
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
###  Unique identifiers

![Web Map Id](images/webmap-id.png)

Note: All portal content has a unique identifier

----


<<<<<<< HEAD
### **Web Scene**
=======
### Bookmarks and Slides
<div style="float:left;">
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Bookmarks.html" target="_blank">Bookmarks widget</a>
* <a href="https://developers.arcgis.com/javascript/latest/sample-code/webscene-slide-tour/index.html" target="_blank">WebScene slides</a>
</div>
<img src="images/bookmarks.png" height=500 style="float:right;">

<a href="http://jsapi.maps.arcgis.com/home/webscene/viewer.html?webscene=a5e17e4ff0544ba8adb26617a6e1bbfd" target="_blank">
  <img src="images/webScene.png" alt="WebScene">
</a>

----
<<<<<<< HEAD


### **ID: Unique Identifier**
=======
### **Demo: Display the map**
</br>
<a href="Demos/Step2" target="_blank">
  <img style="float: center;" src="images/step2demo.png">
</a>

----

### Step 3: Connect to Portal
</br>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html" target="_blank">View of the Portal</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html#load" target="_blank">Load the Portal's resources</a>

<pre class="small" style="display:inline-block; padding: 5px; margin: 10px auto; float:right;"><code data-trim>
// Step 3 Connect to portal
async function loadPortal() {
  const portal = new Portal();
  await portal.load();
}
</code></pre>

<img style="float: center;" src="images/webmap-id.png">

<<<<<<< HEAD
=======
Note:Connect to the portal to get a view of the portal from the current users perspective. If anonymous you will get the default view of the portal. If logged in, the info will be specific to the organization the user is a member of.

----


### **Web map & scenes: JSON information & data**
</br>
<a href="http://jsapi.maps.arcgis.com/sharing/rest/content/items/c6bac25632d646758823daf07216dda1?f=pjson" target="_blank">
  <img  src="images/itemdetails.png">
</a>
<a href="http://jsapi.maps.arcgis.com/sharing/rest/content/items/c6bac25632d646758823daf07216dda1/data?f=pjson" target="_blank">
  <img src="images/iteminfo2.png">
</a>

<<<<<<< HEAD
----

### **Demo: Inside the web map**

=======
 - Details about the [portal](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html)
 - <a href="https://developers.arcgis.com/rest/users-groups-and-items/portal-self.htm" target="_blank">Portal <code>Self</code> call</a>
 - Custom groups
 - Portal defaults like basemap, extent
 - [Helper services](https://jsapi.maps.arcgis.com/sharing/rest/portals/self?culture=en)

<center><pre class="med" style="padding: 5px; margin: 10px auto;"><code data-trim>
   portal.load().then(function(){
     const orgName = portal.name;
     const basemapGallery = portal.basemapGalleryGroupQuery
     const defaultExtent = portal.defaultExtent;
  });
</code></pre></center>
Note: Get info about the portal including region, culture, name, thumbnail url and default properties like the basemap, extent and galleries

----
### **Demo: Connect to Portal**
</br>
<a href="Demos/Step3" target="_blank">
  <img style="float: center;" src="images/step3demo.png">
</a>

----

<a href="http://jsapi.maps.arcgis.com/home/item.html?id=c6bac25632d646758823daf07216dda1" target="_blank">
  <img width="600" src="images/DataResponseDevTools.png" style="float: left;">
  <img width="600" src="images/agoassistant.png">
</a>

<<<<<<< HEAD
=======
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html#queryGroups" target="_blank">Portal.queryGroups()</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html#queryItems" target="_blank">Portal.queryItems()</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html#queryUsers" target="_blank">Portal.queryUsers()</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalGroup.html#queryItems" target="_blank">PortalGroup.queryItems()</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalUser.html#queryFavorites" target="_blank">PortalUser.queryFavorites()</a>

----


### **Access a web map in an application**

<br>
<a href="Demos/LoadWebMap.html">
  <img src="images/Demo1-WebmapCode.png">
</a>

----

<<<<<<< HEAD
### **Access individual layer items**

* 4.x provides support for adding individual portal items into web application
* Call `Layer.fromPortalItem` and pass in the unique id layer item
=======
### [PortalQueryParams](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryParams.html)
</br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
// Get a few items from the default portal or get a few
// items from logged in user and display as thumbnails in side panel

const layerTypes = '(type:("Feature Collection" OR "Feature Service" OR "Map Service" ) -typekeywords:"Table")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" -type:"Map Area" -typekeywords:"MapAreaPackage"';

const query = user ? `owner:${user} ${layerTypes}` : layerTypes;

const itemResults = await portal.queryItems({
  extent: view.extent,
  query
});
</code></pre>

<a href="Demos/CreateLayerPortalItem.html" target="_blank">
  <img src="images/layeritem.png" style="float: bottom;">
</a>

----

### **Demo**

<<<<<<< HEAD
Create application referencing <code>portalItem</code>
=======
### Step 4b: Display query results
PortalQueryResult
[Results](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryResult.html) returned from a portal query
<center><img height=500  src="images/appImage.png"></a></center>

<a href="Demos/CreateLayerPortalItem.html" target="_blank">
  <img src="images/demobyportalitem.png">
</a>

----
<<<<<<< HEAD

### **Portal API**

<a href="https://developers.arcgis.com/rest/users-groups-and-items/working-with-users-groups-and-items.htm" target="_blank">
<img src="images/PortalAPIDoc.png" style="float: bottom;">
=======
### **Demo: Get and display content from Portal**
</br>
<a href="Demos/Step4" target="_blank">
  <img style="float: center;" src="images/step4demo.png">
</a>

----
### Step 5a: Setup add layer click handler
</br>
</br>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
Array.from(document.getElementsByClassName("add-btn")).forEach(function (element) {
  element.addEventListener("click", () => addLayerToMap({
    id: element.getAttribute("data-item")
  }));
});
</code></pre>

<<<<<<< HEAD
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
=======
----
### Step 5b: Add layer to map

* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html#fromPortalItem" target="_blank">Layer.fromPortalItem</a>
* <a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-views-SceneView.html#goTo" target="_blank">Zoom to layer when ready</a>

<p></p>
<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
const layer = await Layer.fromPortalItem(item);
layer.watch("loadStatus", (status) => {
  if (status === "loaded") {
    view.goTo(layer.fullExtent);
  }
});
view.map.add(layer);
}
</code></pre>

----
### **Demo: Add layer to map**
</br>
<a href="Demos/Step5" target="_blank">
  <img style="float: center;" src="images/step5demo.png">
</a>

<<<<<<< HEAD
### **Demo: Portal Rest API via `esriRequest` and API `PortalQueryParams` class**

----

### **Access secure content**

- Handles security so no need to write a bunch of code
- Detects private (unshared) data automatically
- If private, prompts for credentials
  - log-in via Identity Manager dialog prompt or
  - use the platform's provided OAuth framework to handle it for you

=======
----
### Step 6: Add widgets

<a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html" target="_blank">Basemap Gallery</a>

<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
const basemapGallery = new BasemapGallery({
  view,
  source: portal
});
</code></pre>
<a href="https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html" target="_blank">Search</a>

<pre style="display:inline-block; padding: 5px; margin: 10px auto; width: 100%;"><code data-trim> 
const search = new Search({
  view,
  portal
});
</code></pre>


Note: Pass in portal to some widgets to get portal defaults. In this example we'll get search locators and the basemap group

----
### **Demo: Add widgets**
</br>
<a href="Demos/Step6" target="_blank">
  <img style="float: center;" src="images/step6demo.png">
</a>

----
### **Benefits of using the platform security model**

- The web application does not have direct access to credentials
- Support for enterprise logins
- No need to sign in every time calls are made to a secure service
- Track app usage
- Easy to access resources secured with token-based authentication, e.g. premium credit-based services


----

### **Demo: Access private data in a web application**

<<<<<<< HEAD
----

### **Demo: Register an application for Oauth use**

----

### **Access credit-based services**
=======
[DEMO](demos/Demos-BU/PortalAPISample.html)

----
### MISC: Access credit-based services

- Application handles it for you, no need to sign in
- Proxy file with saved credentials
  - Hosted proxy file provided by Esri OR
  - Host your own proxy file
  - Esri proxy -> https://github.com/Esri/resource-proxy
    - DotNet, JSP, and PHP
  
----

<<<<<<< HEAD
=======
### **Tools: AGO Assistant**


<a href="http://jsapi.maps.arcgis.com/home/item.html?id=c6bac25632d646758823daf07216dda1" target="_blank">
  <img width="600" src="images/DataResponseDevTools.png" style="float: left;">
  <img width="600" src="images/agoassistant.png">
</a>

----

<!-- .slide: data-background="../reveal.js/img/bg-rating.jpg" -->

## Questions?

![Survey](Images/bg-rating.png)
----
