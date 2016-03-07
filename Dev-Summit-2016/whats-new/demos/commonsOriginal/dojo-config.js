var dojoConfig = {
  isDebug: true,
  async: true,
  packages: [
    {
      name: "commons",
      location: location.href.substring(0, location.href.lastIndexOf('/') + 1) + "../commons/js" 
    },
    {
      name: "widgets",
      location: location.href.substring(0, location.href.lastIndexOf('/') + 1) + "../commons/widgets" 
    },
    {
      name: "libs",
      location: location.href.substring(0, location.href.lastIndexOf('/') + 1) + "../commons/libs" 
    },
    {
      name: "local",
      location: location.pathname.replace(/\/[^/]+$/, "") + "/js" 
    },
    {
      name: "js",
      location: location.pathname.replace(/\/[^/]+$/, "") + "/js" 
    }
  ]
};