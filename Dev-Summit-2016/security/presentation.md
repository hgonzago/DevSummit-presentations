<!-- .slide: data-background="../../reveal.js/img/title.png" -->
#Security and ArcGIS Web Development
Julie Powell and Heather Gonzago

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Agenda**
 - <span style="color:yellow">Types of apps</span>
 - Traditional token-based authentication
 - OAuth2 authentication
 - User login authentication
 - Two-factor authentication
 - Application authentication
 - Service proxy
 - Resource proxy

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Types of apps**
  - How are you interacting with the application?
  - Are the end users known to the application?
    - User-login
      - Application allows user to log in with valid credentials
  - Are the end users unknown to the application?
    - App-login
      - App provides credentials within the app itself

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Agenda**
 - Types of apps
 - <span style="color:yellow">Traditional token-based authentication</span>
 - OAuth2 authentication
 - User login authentication
 - Two-factor authentication
 - Application authentication
 - Service proxy
 - Resource proxy

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Traditional server-based token authentication**
 - Classic way to access secured services
 - Username and password sent over https
<span style="color:cyan">`/generateToken`</span> call
 - Short-lived token response
 - Handled via SDK’s Identity Manager component
 - Everything handled on the client
 - Web application responsible for keeping credentials secure

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **generateToken**
 - Access secured service with server-based token authentication
 - Identity Manager takes care of most of this work
 - Challenge for credentials <span style="color:cyan">`https://<server>/sharing/rest/generateToken`</span>
 called when credentials are passed
 - Token appended and used to unlock these services

---

<!-- .slide: data-background="../../reveal.js/img/bg-2.png" -->
## **Demo: Traditional token-based authentication**
[![generateToken](images/generateTokenDemo.png)](./demos/GenerateToken/DemoGenerateToken.html)

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
<!-- .slide: data-notes="ArcGIS Based services. User logins, you write the app, and the application is responsible for accessing the credentials from the user and keeping these credentials safe" -->
## **generateToken limitations**
 - The web application has access to credentials
 - The application is responsible for recognizing when to prompt for login
 - No enterprise logins
 - Need to sign in every time calls made to a secure service
 - Can’t track how the app is being used
 - Can’t list in Marketplace

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Agenda**
- Types of apps
- Traditional token-based authentication
- <span style="color:yellow">OAuth2 authentication</span>
- User login authentication
- Two-factor authentication
- Application authentication
- Service proxy
- Resource proxy

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: User login authentication**
[![user logins](images/userLoginDemo.png)](./demos/UserLogin_OAuth/OAuthUserLoginSecureWebMap.html)

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: User login workflows**

 - Working with browser-based or mobile applications?
   - 1-step workflow, i.e. Implicit Grant

 - Desktop, mobile, or server-side web application?
  - 2-step workflow, i.e. Authorization Grant

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: 1 step user-login workflow**

<img style="float: right;" src="images/UserLoginWorkflowSteps.png">
1. App directs user to /authorize endpoint
2. Valid user/pass?
3. Redirect back to app at provided `redirect_uri`
4. `access_token` is added to URL
5. [App can parse the URL for token use](https://developers.arcgis.com/authentication/browser-based-user-logins/#parse-the-token-from-the-url)


---

## GroupLayer

 - New layer: GroupLayer
 - group layers together
 - structure your data visualization
 - visibility mode: `exclusive`, `independent`, `inherit`
 - listMode: `hide-children`, `hidden`
 - [demo](demos/grouplayer/index.html)

---

## Collection

 - More or less like an Array
 - `add` / `remove` / `forEach` / `map` / `find` / `findIndex`...
 - emit "change" events when something is added/removed/moved
 - used for layers, used for layers in Basemap, used for graphics...

---

## Basemap

- full fledge class `esri/Basemap`
- basemap's layers are not part of the `map.layers`, but from `map.basemap`
- contains 3 Collections: baseLayers, referenceLayers, elevationLayers
- can be set with
  - [string for esri's basemap](demos/basemap/2d.html)
  - or custom [Basemap instance](demos/basemap/2d-custom.html)
  - in 2D and [3D](demos/basemap/3d.html)

---

## Basemap

 - `basemap` as a string, creation of the appropriated Basemap instance

  ```javascript
  var map = new Map({
    basemap: 'topo'
  });

  map.basemap = 'streets';
  ```

 - `basemap` as an instance of `Basemap`

  ```javascript
  var map = new Map({/*...*/});

  var toner = new Basemap({
    baseLayers: [
      new WebTiledLayer({
        urlTemplate: '...'
      })
    ]
  })

  map.basemap = toner;
  ```

---

## 2D
 - new "engine" in the work.
 - faster, more future proof
   - abstraction to draw tiles and dynamic images to ease custom layers/layerviews
   - abstraction to draw in DOM or Canvas, possibly webgl ;-)
 - display graphics while zooming.
 - rotation
 - continous zoom
 - [vector map tiles](http://blogs.esri.com/esri/arcgis/2015/07/20/vector-tiles-preview/), [basemaps](http://basemapsbeta.arcgis.com/preview/app/index.html)

---

## 3D
 - webgl engine to display the earth.
 - [z/m support](http://maps.esri.com/rc/sat/index.html) in the API, tasks, layers...
 - support for simple symbols
 - new 3D Symbols

---

## Resizing logic
 - automatically measure and position the view
 - [resize by center, or not](demos/resizing/manual-resize.html)
 - better integration with responsive design pages
 - and [frameworks](demos/resizing/responsive-bootstrap.html)

---

## Padding
 - easier fullscreen view application.
 - defines inner margin to make space for UI.
 - [2D](demos/padding/2d.html)
 - [3D](demos/padding/3d.html)

---

## Animation
 - generic function `animateTo(target, options):Promise`
 - customize [easing, duration, chaining](demos/animation/random.html)
 - DIY using [other libs](demos/animation/tweenjs.html) or [custom](demos/whats-next/routing.html)
 - `esri/Viewpoint`: common way to share between 2D/3D

---

## Widgets
 - `ui` property on view to quickly place components
 - widgets designed as MVVM
   - separates the logic from the UI implementation
   - easier to create new versions using other frameworks
 - ported to 4.0beta1: Search, Zoom, Attribution
 - new ones: Compass

---

## WebMap & WebScene APIs
 - read
 - save / save as
 - easier portal / arcgis.com interaction

---

## SDK
 - new SDK, built from scratch
 - simpler, focused samples
 - user experience
 - more code snippets

---

## Other
 - legacy dojo loader removed - AMD only
 - classes properly cased: esri/Map, esri/Graphic, esri/layers/Layer
 - new folder structure.

---

## Beta2
 - initial implementation of WebMap and WebScene. reading first
 - more layer support
 - more widgets
 - performance improvements
 - 3D
   - realistic atmosphere
   - subsurface rendering
   - point cloud
   - planar mode
 - bugs...

---


## Conclusion
 - One API
 - 3D, and better 2D
 - simplified API

---

# Questions

---
