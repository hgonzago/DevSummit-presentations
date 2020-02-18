
# Intellisense in VSCode
In order to use intellisense from the JSAPI in your app you'll want to develop in ES2015 and transpile your code to ES5. In this demo we do this using Babel. If you'd like to read a bit more about ES6 and the JSAPI see Rene's [Use ES2015 with ArcGIS API for JavaScript] (http://odoe.net/blog/use-es2015-with-arcgis-api-for-javascript/) post.


* Make sure you have npm and node installed.  [Install details](https://www.npmjs.com/get-npm)
* Run npm init --yes to create a package.json file if you don't already have one
* Install Babel CLI, Core and Preset (enable transforms for ES2015) by running the following at the command line 
``` 
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
* Install the plug-in to enable AMD output
``` 
    npm install --save-dev @babel/plugin-transform-modules-amd

```
* Install the ARCGIS API for JavaScript Typings 
```
   npm install --save @types/arcgis-js-api
```
* Define Babel options in package.json and add the following: 

```
"babel": {
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
      "@babel/plugin-transform-modules-amd"
    ]
  }
```

Alternatively create a .babelrc file with the above options. 

* Add dev and build scripts to the scripts section of package.json.  The dev script sets up a watch on the src directory and when files are modified it will transpile using the options specified above and write out the ES5 js file to the dist folder.  The build script does a one time transpile without the watch. 
```
  "scripts": {
    "dev": "babel src --watch --out-dir dist",
    "build": "babel src --out-dir dist"
  }
```

To test the scripts type ``` npm run dev ``` at the command line or ``` npm run build ```

## Resources 
---
Rene's post
http://odoe.net/blog/use-es2015-with-arcgis-api-for-javascript/

Details on Babel CLI usage 
https://babeljs.io/docs/usage/cli/

ES6 Capabilities Browser Support 
https://caniuse.com/#search=es6

VSCode Intellisense Doc
https://code.visualstudio.com/docs/languages/javascript

