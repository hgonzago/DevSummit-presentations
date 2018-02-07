define([
  "esri/config",
  
  "dojo/query"
], function(
  esriConfig,
  query
) {

esriConfig.request.corsEnabledServers.push("genesis.esri.com");
esriConfig.request.proxyUrl = "/proxy/proxy.ashx";
// esriConfig.defaults.io.proxyUrl = "/proxy-test/proxy.jsp";

cartouche = query(".drawer ~ .applicationBar .cartouche");
if (cartouche) {
  cartouche.on("click", function(event) {
    query(".application").toggleClass("open");
  });
}


});
