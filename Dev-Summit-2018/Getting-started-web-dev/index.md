<!-- .slide: data-background="../reveal.js/img/bg-1.png" -->
<!-- .slide: class="title" -->
<br>
<br>
<br>
### Getting Started with Web Development 
### and the ArcGIS API for JavaScript
<br>
Noah Sager and Heather Gonzago

---

### **Agenda**
 - Setup
 - First steps
 - Working with layers
 - Symbols and renderers
 - Make the map interactive
 - Widgets and styling

---

### **Presentations accessible via GitHub**
  - This session focuses on version 4.x
  - Concepts remain similar between versions 3.x and 4.x 
  - https://github.com/hgonzago/DevSummit-presentations

---

### **Where do I begin?**
<a href="https://developers.arcgis.com/javascript/">
<img src="images/landingPage.png" alt="JavaScript landing page" width="880" height="600">
</a>

---

### **Which version of the API is best?**
<a href="https://developers.arcgis.com/javascript/latest/guide/functionality-matrix/index.html">
<img src="images/apiVersion.png" alt="API functionality matrix" width="700" height="600">
</a>

---

### **Developer Setup**
[![IDEs](images/ides.png)](https://www.slant.co/topics/1686/~javascript-ides-or-editors)

---

### **JSAPI Resources**
<a href="https://github.com/Esri/jsapi-resources">
<img style="float: right;" alt="JSAPI resources" src="images/jsapiResources.png" width="790" height="600">
</a>
 - Includes
   - JSHint file
   - TypeScript definition file
   - Build tools, e.g. Bower
   - OAuth popup callback page

---

### **Get the API**
 - [CDN](https://developers.arcgis.com/javascript/latest/guide/get-api/index.html)
 - Custom builds
 - [Download builds](https://developers.arcgis.com/downloads/)
</br>
</br>
 <pre><code data-trim>
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://js.arcgis.com/4.6/esri/css/main.css&quot;&gt;
&lt;script src=&quot;https://js.arcgis.com/4.6/&quot;&gt;&lt;/script&gt;
</code></pre>

---

### ****
- Types of apps
- Traditional token-based authentication
- <span style="color:yellow">OAuth2 authentication</span>
- User login authentication
- Application authentication
- Resource proxy
- ArcGIS Online hosted proxy

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2 authentication: why and when**
- <span style="color:cyan">Why you may want to use OAuth2</span>
  - Get access to info on how the app is being used, whom is accessing it, credit usage, etc.
  - The platform handles the login for you
- <span style="color:cyan">When to use OAuth2</span>
  - Access users’ private data
  - Create and publish content
  - Access premium content and services on AGO

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Register your app**
- Possible in Online and Portal (as of 10.3), or Developers site
- Generates:
  - <span style="color:cyan">App ID (client_id)</span>
  - <span style="color:cyan">App Secret (client_secret)</span>

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Demo: Register your app**

<img style="middle: left;" src="images/registerapp.png">

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Agenda**
- Types of apps
- Traditional token-based authentication
- OAuth2 authentication
- <span style="color:yellow">User login authentication</span>
- Application authentication
- Resource proxy
- ArcGIS Online hosted proxy

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: User login authentication**

<img style="float: right;" src="images/UserLoginWorkflowSteps.png">

- Works with named users
- Server-side login page
- Provides single sign-on
  - If already in active portal session, </br>
  user is not required to enter credentials again
  - Approval screen to grant access to the app

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: Typical user login workflows**
 - Working with browser-based or mobile applications?
   - 1-step workflow, i.e. Implicit Grant

 - Desktop, mobile, or server-side web application?
  - 2-step workflow, i.e. Authorization Grant

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: 1 step user-login workflow**

<img style="float: right;" src="images/UserLoginWorkflowSteps.png">
  1. App directs user to <span style="color:cyan">`/authorize`</span> endpoint
  2. Valid user/pass?
  3. Redirect back to app at provided <span style="color:cyan">`redirect_uri`</span>
  4. <span style="color:cyan">`access_token`</span> is included with the response
  5. [App can parse the URL for token use](https://developers.arcgis.com/authentication/browser-based-user-logins/#parse-the-token-from-the-url)

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: Identity Manager**
- Client SDKS provide OAuth2 functionality via the Identity Manager
- Handles the complexity of calling endpoints and parsing tokens
- Example: JS API Identity Manager
  - <span style="color:cyan">`OAuthInfo`</span> class -> pass in registered <span style="color:cyan">`App ID`</span>
  - Pass this information to the Identity Manager
<img style="float: bottom;" src="images/IdentityManager.png">

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Demo: OAuth2 login**

[![user login](images/userLoginDemo.png)](./demos/UserLogin_OAuth/OAuthUserLoginSecureWebMap.html)

---


<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: 2 step user-login workflow**
<img style="float: center;" src="images/2Step-RequestAsset.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Get authorization code**
<img style="float: center;" src="images/2Step-GetAuthCode.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Auth code sent to Server (redirect uri)**
<img style="float: center;" src="images/2Step-RedirectURI.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Request Tokens (Access + Refresh)**
<img style="float: center;" src="images/2Step-AccessRefresh.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Redirect to Callback with Tokens**
<img style="float: center;" src="images/2Step-CallbackToken.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Save Refresh Token on Server**
<img style="float: center;" src="images/2Step-SaveRefresh.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Trusted Server Connection:**</br>
## **Obtain info about user**
<img style="float: center;" src="images/Step2-TrustConnection.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: App config based on user/role**
<img style="float: center;" src="images/2Step-AppConfig.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Access secured ArcGIS Server services:**</br>
## **(based on user/role)**
<img style="float: center;" src="images/2Step-AccessService.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Send Token to Client App**
<img style="float: center;" src="images/2Step-ClientToken.png">


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **2 step: Request Asset Again & Authorize**
<img style="float: center;" src="images/2Step-RequestAgain.png">


---


<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Enterprise logins**

- Login to ArcGIS Online using your enterprise login (Active Directory, LDAP, …)
- Uses the SAML standard
- [Setting up Enterprise Logins](http://doc.arcgis.com/en/arcgis-online/administer/enterprise-logins.htm)
</br>
- Nothing changes for the App Developer
  - Use standard OAuth workflow (redirect user to /authorize URL as usual)
  - Portal detects enterprise login if configured for the organization
  - Redirects user to their enterprise provider
  - Enterprise redirects user to portal upon login
  - Portal generates token and sends it to the app

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Agenda**
 - Types of apps
 - Traditional token-based authentication
 - OAuth2 authentication
 - User login authentication
 - <span style="color:yellow">Application authentication</span>
 - <span style="color:yellow">Resource proxy</span>
 - ArcGIS Online hosted proxy

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: application authentication**


- <span style="color:cyan">When would you want to use app authentication?</span>
</br>Do not want users to have to log in to access application and/or content. 
- Access the following services:
 - Geocoding
 - Routing and Directions
 - Demographic Data (GeoEnrichment)
 - Esri Geotrigger Service
 - Esri Premium Maps and Layers which require a subscription.
 - Elevation Analysis


---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: application authentication**

- Users of the App are unknown to the ArcGIS platform
- No login prompts
- App logs in to the ArcGIS platform on behalf of itself
- App must contain valid app credentials
- Proxy is responsible for keeping the app secret secure

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: app authentication workflow**

<img style="float: right;" src="images/appauthentication.png">
  1. App makes POST to <span style="color:cyan">`/token`</span> endpoint</br>
  with <span style="color:cyan">`client_id`</span> </br> and <span style="color:cyan">`/client_secret`</span> </br> with <span style="color:cyan">`grant_type=client_credentials`</span>

  2. <span style="color:cyan">`Access_token`</span> in JSON response

  3. Parse token and use in requests as needed

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Limitations with app authentication**

- Applications can only read or query private data content.
- Cannot modify, upload, create, or delete content.
- Cannot list applications in ArcGIS Marketplace. 

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **App logins: proxy steps**

1. Register app
2. Configure proxy with app credentials
3. Proxy uses app credentials to get app token from the portal
4. Front-end app calls into the proxy
5. Proxy uses app token to call into secured portal resources
6. Proxy returns results to the app

---

<!-- .slide: data-background="../../reveal.js/img/bg-2.png" -->
## **Demo: app authentication**
<img style="float: center;" src="images/appauthdemo.png">

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **OAuth2: Security with application authentication**
- Never expose client_secret
- Keep secure server-side in proxy
- Rate limiting against server-based misuse

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Updated proxy files**

- [https://github.com/Esri/resource-proxy](https://github.com/Esri/resource-proxy)
- DotNet, JSP, and PHP
- Access resources secured with token-based authentication, i.e. premium credit-based services
- Resource and referer-based rate limiting
- Access cross domain resources
- Enabled logging

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Proxies**

- Install proxy based on README.md file
- Can also use token based authentication in addition to OAuth2
- Locking it down by referrer: Only requests coming from listed referrers are proxies
- Rate limits
  - rateLimitPeriod: The time period (in minutes) which the rateLimit is tracked.
  - rateLimit: Maximum number of requests for a specific referer over the given rateLimitPeriod.

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Agenda**
 - Types of apps
 - Traditional token-based authentication
 - OAuth2 authentication
 - User login authentication
 - Application authentication
 - Resource proxy
 - <span style="color:yellow">ArcGIS Online hosted proxy</span>

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **ArcGIS Online hosted proxy**

- Esri maintained server-side proxy service
- Allows access to a secured AGO service 
- Token is not stored with the client app
- The proxy service also supports a whitelist based on the HTTP Referer header 
- Supports service rate limiting

---

<!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## **Configure AGO hosted proxy**
[![generateToken](images/agoproxy.png)](./demos/AGOProxy/index.html)

---

 <!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
## Conclusion

- Use OAuth2 for user logins
- Benefits include usage tracking, enterprise logins, etc.
- Identity Manager simplifies login workflow in client SDKs
- [https://developers.arcgis.com/authentication](https://developers.arcgis.com/authentication) for additional information.

---

 <!-- .slide: data-background="../../reveal.js/img/bg-5.png" -->
# Questions

---
