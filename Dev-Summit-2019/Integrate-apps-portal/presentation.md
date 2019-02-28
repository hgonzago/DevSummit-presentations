<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
<br>
<br>
<br>
### Building Web Apps that Integrate with Your Portal
<br>
 Heather Gonzago and Kelly Hutchins

----

### Agenda

- Portal Overview
- Accessing Portal content
- Inside web map/scenes
- Working with portal layers
- Security
- Tools

----


### Advantages of working with AGO/Portal

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

### Portal content: Unique identifier
![Web Map Id](images/webmap-id.png)

Note: All portal content has a unique identifier
----

### Connect to Portal
</br>
- View of the portal
- authMode  <pre>anonymous|auto|immediate</pre>

<pre class="small" style="float:right;">
<code>
const portal = new Portal();
portal.authMode = "immediate";
portal.load().then(function(){});

</code></pre>


Note:Connect to the portal to get a view of the portal from the current users perspective. If anonymous you['ll get the default view of theportal. If logged in the info will be specific to the organization the user is a member of.

----

### Access Portal Properties

</br>

 - Details about the [portal](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html)
 - Custom groups
 - Portal defaults like basemap, extent
 - [Helper services](https://jsapi.maps.arcgis.com/sharing/rest/portals/self?culture=en)

<center><pre class="med"><code>
   portal.load().then(function(){
     const orgName = portal.name;
     const basemapGallery = portal.basemapGalleryGroupQuery
     const defaultExtent = portal.defaultExtent;
  });
</code></pre></center>
Note: Get info about the portal including region, culture, name, thumbnail url and default properties like the basemap, extent and galleries

----

### Query portal content

- Portal.queryGroups(
- [Portal.queryItems()](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html#queryItems)
- Portal.queryUsers()
- PortalGroup.queryItems()
- PortalUser.queryFavorites()


Note: Lots of methods available to easily query portal content. Get items, groups, users, favorites and more

----

### [PortalQueryParams](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryParams.html)
</br>

![Query portal items](images/queryitem.png)

Note: Use portalQueryParams to refine the query. Code sample performs two queries and waits for results of both to
finish. queryItems takes in extent, owner name and list of layer types to return

----


### PortalQueryResult

[Results](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryResult.html) returned from a portal query
<center><a href="Demos/DemoApp/app/main.ts"><img  height=500  src="images/appImage.png"></a></center>

Note: Loop through the returned results array and create an item in a select box for each layer

----
### Add layer items

* Layer.fromPortalItem

![Add layer item](images/fromportalitem.png)

----

### Web content - JSON

</br>
<div style="float:left;text-align:left;">
<a href="https://jsapi.maps.arcgis.com/sharing/rest/content/items/7761d81ff08e45f2a7f27997e8d3e92d?f=json">Map information</a>
<br>
<a href="https://jsapi.maps.arcgis.com/sharing/rest/content/items/7761d81ff08e45f2a7f27997e8d3e92d/data?f=json">Map details</a>
</div>
<img src="images/mapviewer.png" height=600 style="margin-top:-50px;float:right;" />


----

### **Demo: Inside the web map**


<a href="http://jsapi.maps.arcgis.com/home/item.html?id=c6bac25632d646758823daf07216dda1" target="_blank">
  <img width="600" src="images/DataResponseDevTools.png" style="float: left;">
  <img width="600" src="images/agoassistant.png">
</a>


----
### Access a web map in an application
- esri/WebMap
- esri/WebScene
<br>
<a href="Demos/LoadWebMap.html">
  <img src="images/webmap.png">
</a>

----

### Web map and scene : additional info
<div style="float:left;">
- [Bookmarks](https://developers.arcgis.com/javascript/latest/sample-code/widgets-bookmarks/index.html)
- [Slides](https://developers.arcgis.com/javascript/latest/sample-code/webscene-slide-tour/index.html)
</div>
<img src="images/bookmarks.png" height=500 style="float:right;">

Note: Web maps and scenes have additional info we can access like bookmarks and slides

----
### Widgets : Specify portal

- Basemap Gallery
<br>
<img src="images/bmg.png" >
<br>
- Search
<br>
<img src="images/search.png">

----


### Demo: Portal Rest API via `esriRequest`

[ArcGIS REST API](https://developers.arcgis.com/rest/users-groups-and-items/working-with-users-groups-and-items.htm)

[DEMO](Demos/PortalAPISample.html)
----

### Access secure content

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

### Demo: Access private data in a web application

----

### Demo: Register an application for Oauth use

----

### Access credit-based services

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
