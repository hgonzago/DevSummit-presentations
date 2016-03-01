define([
  "esri/config",
  
  "dojo/query",

  "libs/codemirror/codemirror",
  
  "libs/codemirror/mode/javascript/javascript",

  "dojo/domReady!"
], function(
  esriConfig,
  query,
  CodeMirror
) {

var theme = document.body.classList.contains("dark") ? "dark" : "light";

if (esriConfig.request) {
  esriConfig.request.corsEnabledServers.push("scenesampleserverdev.arcgis.com");
  esriConfig.request.proxyUrl = "/proxy/proxy.ashx";
  // esriConfig.defaults.io.proxyUrl = "/proxy-test/proxy.jsp";
}
else {
  esriConfig.defaults.io.corsEnabledServers.push("scenesampleserverdev.arcgis.com");
  esriConfig.defaults.io.proxyUrl = "/proxy/proxy.ashx";
  // esriConfig.defaults.io.proxyUrl = "/proxy-test/proxy.jsp";
}

cartouche = query(".drawer ~ .applicationBar .cartouche");
if (cartouche) {
  cartouche.on("click", function(event) {
    query(".application").toggleClass("open");
  });
}

var codemirrorDiv = document.getElementById('codemirror');
if (codemirrorDiv) {
  window.editor = CodeMirror.fromTextArea(codemirrorDiv, {
    lineNumbers: true,
    mode: 'javascript',
    scrollbarStyle: 'null',
    theme: theme === 'dark' ? 'monokai' : 'default'
  });
}


});
