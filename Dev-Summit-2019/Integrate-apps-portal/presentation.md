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
- Build an app
  - Handle authentication
  - Display Web Map or Web Scene
  - Connect to Portal
  - Get and display content from Portal
  - Add layers to map
  - Add widgets
- Tools & Resources

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
### Step1: Setup Authentication

  - Register the app

  ![OAuth registration](images/IdentityManager.png)

  - Sign in

  ![Credentials](images/credential.png)

  - Sign out

  ![Destroy Credentials](images/signout.png)


----
### Authentication

 Is user already logged in?

 <pre><code>
  IdentityManager.checkSignInStatus(portalUrl).always((info) => {

  });
 </code></pre>


----
###  Unique identifiers
![Web Map Id](images/webmap-id.png)

Note: All portal content has a unique identifier
----

### Step 2: Display a map (todo update with new demo link when done)
- 2D: esri/WebMap
- 3D: esri/WebScene
<br>
<a href="Demos/LoadWebMap.html">
  <img src="images/webmap.png">
</a>

----

### Bookmarks and Slides
<div style="float:left;">
- [Bookmarks](https://developers.arcgis.com/javascript/latest/sample-code/widgets-bookmarks/index.html)
- [Slides](https://developers.arcgis.com/javascript/latest/sample-code/webscene-slide-tour/index.html)
</div>
<img src="images/bookmarks.png" height=500 style="float:right;">

Note: Web maps and scenes have additional info we can access like bookmarks and slides

----

### Step 3: Connect to Portal
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

### Step 4a: Query portal content

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


### Step 4b: Display query results
PortalQueryResult
[Results](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryResult.html) returned from a portal query
<center><a href="Demos/DemoApp/app/main.ts"><img  height=500  src="images/appImage.png"></a></center>

Note: Loop through the returned results array and create an item in a select box for each layer

----
### Step 5a: Setup add layer click handler

![Add layer button](images/addlayerButton.png)

----

### Step 5b: Add layer to map

* Layer.fromPortalItem
* Zoom to layer when ready

![Add layer item](images/fromportalitem.png)

----


### Step 6: Add widgets

- Basemap Gallery
<br>
<img src="images/bmg.png" >
<br>
- Search
<br>
<img src="images/search.png">

Note: Pass in portal to some widgets to get portal defaults. In this example we'll get search locators and the basemap group
----


### MISC: Portal Rest API via `esriRequest`

[ArcGIS REST API](https://developers.arcgis.com/rest/users-groups-and-items/working-with-users-groups-and-items.htm)

[DEMO](Demos/PortalAPISample.html)
----


### MISC: Access credit-based services

- Application handles it for you, no need to sign in
- Proxy file with saved credentials
  - Hosted proxy file provided by Esri OR
  - Host your own proxy file
  - Esri proxy -> https://github.com/Esri/resource-proxy
    - DotNet, JSP, and PHP

----

### **Tools: AGO Assistant**


<a href="http://jsapi.maps.arcgis.com/home/item.html?id=c6bac25632d646758823daf07216dda1" target="_blank">
  <img width="600" src="images/DataResponseDevTools.png" style="float: left;">
  <img width="600" src="images/agoassistant.png">
</a>


----

<!-- .slide: data-background="../reveal.js/img/bg-rating.jpg" -->

## Questions?

**Help us to improve** by filling out the survey

![Survey](images/survey-slide.png)

----
