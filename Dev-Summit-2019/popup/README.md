Presentation - https://hgonzago.github.io/DevSummit-presentations/Dev-Summit-2019/Dev-debug-tips/

Demos - https://hgonzago.github.io/DevSummit-presentations/Dev-Summit-2019/Dev-debug-tips/Demos

# DS2019-TipsAndTricks
ArcGIS APi for JavaScript: Tips and Tricks for Developing and Debugging Apps

### Setup Code Assist  (K)
  * [Code Assist Demo](CodeAssistDemos/javascript-demo/README.md)
  * Resources:
    [JSAPI TS Setup](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)

### Snippets use in VSCode, Sublime, Atom (K)

    1. Demo creating snippet
    2. Add snippet to Sublime or VSCode and show how to use
    3. Also show a demo of combining a few Emmet shortcuts and snippets to setup project. Use ! to stub out html, link:css

    Resources :
     [Tool to create snippets](https://pawelgrzybek.com/snippet-generator/)
     [My snippet library](https://github.com/kellyhutchins/Code-Snippets-JSAPI)
     [Emmet support for Sublime Text 3](https://emmet.io/blog/sublime-text-3/)
     [Emmet cheat sheet](https://docs.emmet.io/cheat-sheet/)

### Emmet (K)

### Local Web Server (K)

Setting up a development web server is an easy way to quickly develop and test your apps built with the ArcGIS API for JavaScript without having to setup something like Apache or IIS.

* John Gravois has a great intro on setting up a [web server](https://gist.github.com/jgravois/5e73b56fa7756fd00b89)
* Many IDE's have extensions or plug-ins you can install. One example is Live Server in VSCode
* (TODO) update demo to use http-server Another option is to use [Express](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment) to create a simple web server within your project.
    1. Install express
            ```
            npm install express
            ```
    2. Create a simple file - in the sample app we name it server.js and paste the following code:

            ```
            const express = require('express');
            const app = express();
            const root = `${__dirname}/dist`;

            app.use(express.static(root));
            app.listen(5678);

            console.log('Running on http://localhost:' + 5678);

            ```
    3. Open a command prompt in the app folder and type ``` node server.js ```
    4. Open a browser and point it to the url specified in the console and you should see your app.

[Development Server Demo](Developm/Express)
[IndexZero](https://github.com/indexzero/http-server)

## JSAPI Resources Repo  (H)
* [JShint, oauth callback, TS etc](https://github.com/Esri/jsapi-resources)

### Dev Tool Workspaces (H)
    * Persist dev tool changes locally https://developers.google.com/web/tools/setup/setup-workflow
    * Local overrides

### Useful Browser Extensions  (H & K)
    * Accessibility Testing [Axe accessibility extenstion](https://axe-core.org/about/)
        **  Axe Coconut (like Chrome Canary or Firefox Nightly)
    * Quickly check out fonts used on web page [WhatFont](http://www.chengyinliu.com/whatfont.html)
    * JSON Prettifier (I use JSONView in Chrome ) [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)
    * Screen Reader [ChromeVox](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en)

### AGO Assistant  (H)
[Ago Assistant Tool](https://ago-assistant.esri.com/)
### JSAPI FAQ  (H)
    * Module order
    * How do I know when xxx feature will be available in 4.x
    * 4x extent-changed event: https://community.esri.com/thread/207901-in-4x-how-to-catch-extent-change-event
    * View then/when

### Accessibility (K)
 * Audits
 * Check color contrast

### Debugging and Testing  (K)
    * Using debugger to stop at point in code then inspect.
    * Throttling via browser
    * Mobile emulation
    * Debug requests using Network tab

  ### Custom ArcGIS API 4 for JavaScript object formatting for Chrome Dev Tools (Either H or K)
   * Setup and demo this: https://github.com/ycabon/arcgis-js-api-devtools
   ### Additional Tips  (??)
   * Join the Spatial Community on slack
   * Geonet
