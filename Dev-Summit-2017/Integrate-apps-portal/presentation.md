<!-- .slide: data-background="../reveal.js/img/title.png" -->
<!-- .slide: class="title" -->
# Building Web Apps that Integrate with Your Portal
Bjorn Svensson and Heather Gonzago

----

## **Agenda**

* General AGO/Portal overview
* Inside web map/scenes
* Adding AGO content to a JS application
* Working with secured AGO items in a JS application

----

<div style="text-align: left">

## **Advantages of working with AGO/Portal when building web apps**

- Sharing and managing secure resources
- Data hosting
- Easy to leverage- Less code- Reusable- Organize/Update content centrally without updating apps

<img width="600" src="images/PortalIcon.png" style="position: absolute; top: 110px; right:0; background:lightsteelblue; border:none; box-shadow:none; "/>

----


## **Architecture: Apps + Content**

<img class="stretch" src="images/Architecture.png" alt="Architecture" style="background:none; border:none; box-shadow:none;"/>

----

## **Content: Basic building block for Apps**

<img class="stretch" src="images/Content-diagram.png" alt="Content"style="background:none; border:none; box-shadow:none;"/>

----

## **Web Maps**

<a href="http://arcg.is/01f1nO" target="_blank">
  <img class="stretch" src="images/webMap.png" alt="Webmap">
</a>

----

## **Web Scene**

<a href="http://jsapi.maps.arcgis.com/home/webscene/viewer.html?webscene=bde8e884a5064f48bcf3440964d748e2" target="_blank">
  <img class="stretch" src="images/webScene.png" alt="Webmap">
</a>

----


## **ID: Unique Identifier**

<img style="float: center;" src="images/webmap-id.png">


----


## **Web map & scenes: JSON information & data**

<img width="500" src="images/itemdetails.png">
<img width="500" src="images/iteminfo2.png">


----

## **Demo: Inside the web map/scene**


<a href="http://jsapi.maps.arcgis.com/home/item.html?id=09025acac97146949f71422fcc4dde71" target="_blank">
  <img width="600" src="images/DataResponseDevTools.png" style="float: left;">
  <img width="600" src="images/agoassistant.png">
</a>


----


## **Access web map/scene in application**

<img src="images/Demo1-WebmapCode.png" style="bne; border:none; box-shadow:none; class='stretch'">

----

## **Access individual layer items**

* 4.x provides support for adding individual portal items into web application
* Call `Layer.fromPortalItem` and pass in the unique id of the layer portal item

<img src="images/layeritem.png" style="float: bottom;">

----

## **Demo**

Create web applications referencing <code>portalItem</code>

<img class="stretch" src="images/demobyportalitem.png" style="background:none; border:none; box-shadow:none; float: center;">


----

## **Portal API**

<a href="http://resources.arcgis.com/en/help/arcgis-rest-api/#/Content_Root/02r300000093000000/" target="_blank">
<img src="images/PortalAPIDoc.png" style="float: bottom;">
</a>

----

## **WebMap and Portal classes**

<div style="text-align: left">

- [esri/WebMap](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html)
- [esri/WebScene](https://developers.arcgis.com/javascript/latest/api-reference/esri-WebScene.html)
- esri/Portal
  - [Portal](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html)
  - [PortalFolder](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalFolder.html)
  - [PortalGroup](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalGroup.html)
  - [PortalItem](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalItem.html)
  - [PortalQueryParams](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryParams.html)
  - [PortalQueryResult](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalQueryResult.html)
  - [PortalRating](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalRating.html)
  - [PortalUser](https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalUser.html)

----

## **Demo: Portal Rest API via `esriRequest` and API `PortalQueryParams` class**

----

## **Access secure content**

- Handles security so no need to write a bunch of code
- Detects private (unshared) data automatically
- If private, prompts for credentials
  - log-in via Identity Manager dialog prompt or
  - use the platform's provided OAuth framework to handle it for you


----

## **Demo: Access private data in a web application**



----

## **Demo: Register an application for Oauth use**

----
## **Support for saving web scene**

----

## **Demo: Show save scene sample**

----
## **Configurable apps**

----


## **Questions ????**


----

# Please take our survey
1. Download the Esri Events app and go to DevSummit
2. Select the session you attended
3. Scroll down to the "Feedback" section
4. Complete Answers, add a Comment, and Select "Submit"

![Submit Feedback](images/submit-feedback.png)


----

<!--.slide: data-background="../reveal.js/img/end.png" -->

----
