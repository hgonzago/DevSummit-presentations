# Building Web Apps that Integrate with Your Portal

## Demos


### Demo: Inside the web map/scene

Note:
Web maps are defined in JSON, a text format that can be easily transferred and stored.  A web map is compose of two sets of information. The item information which contains details about the web map like title, description, author etc. The other portion is the web map data which describes the map contents like layers, popup info, extent, symbology, bookmarks and more. Visit the web map specification for more details about the components of a web map.Show examples:Web map:http://jsapi.maps.arcgis.com/home/webmap/viewer.html?webmap=09025acac97146949f71422fcc4dde71Item details:http://www.arcgis.com/sharing/rest/content/items/09025acac97146949f71422fcc4dde71?f=pjsonItem Info:http://www.arcgis.com/sharing/rest/content/items/09025acac97146949f71422fcc4dde71/data?f=pjson
1. Open up web map with Dev Tools open
2.  Watch for the data request and copy the response containing the operationsl layers

3. Show the AGO-assistant -> how it makes working and viewing with the JSON of these items much easier to inspect content and data4. Point to the online doc for the web map/scene spec
5. Drill down to the rendering section, highlight how much goes into just the rendering within the map itself.

One of the really awesome things about using existing web maps in your web applications is that all the rendering and other info (e.g. popups) get stored directly in the map and do not need to be recreated.

### Create a basic web application using a web map

1. Take the existing web map and copy/paste 09025acac97146949f71422fcc4dde71, [load web map demo](LoadWebMap.html). Show that you can swap out the UID with that of another web map and see how it automatically updates within the web application. Use 0f469011a580418e962de875e354fa9a for Palm Springs to demonstrate.

2. Show the same example using a web scene, [load web scene demo](LoadWebScene.html), bde8e884a5064f48bcf3440964d748e2.

3. Show [adding a layer from a portal item](CreateLayerPortalItem.html). Point out how all rendering, and popup information is carried over.

### Portal API

* Show [web app](PortalAPISample.html) using `esriRequest` and Portal API calls.
* Show comparable web app using [PortalQueryParams](PortalQueryParams)

### Accessing secure data

* Public webmap with private layer in it - http://jsapi.maps.arcgis.com/home/webmap/viewer.html?webmap=a02186c1cf694d2383b23fe73d580ae2
* Private webmap - http://jsapi.maps.arcgis.com/home/item.html?id=3ad77fb66ca04af8943ab280bf0aa42b
* Private layer - http://jsapi.maps.arcgis.com/home/item.html?id=44acaeec04cd47fa8364d1475ff93004  (This is a hosted feature layer view). This allows you to create a different view of the data representated by the hosted FL. Useful if you need to specify different rendering, display, editing permissions, shared to different groups, etc.

http://doc.arcgis.com/en/arcgis-online/share-maps/create-hosted-views.htm


1. Open the demo used for creating a web map using just the unique id.
2. Swap out the id with that of the unshared map (a02186c1cf694d2383b23fe73d580ae2)
3. Without adding any additional functionality in the actual code, notice that the ID manager prompts the user to login to access the webmap.
