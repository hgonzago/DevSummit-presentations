import WebMap from "esri/WebMap";
import SceneView from "esri/views/SceneView";
import Portal from "esri/portal/Portal";
import OAuthInfo from "esri/identity/OAuthInfo";
import IdentityManager from "esri/identity/IdentityManager";


handleAuthentication();

const map = new WebMap({
  portalItem: {
    id: "7761d81ff08e45f2a7f27997e8d3e92d"
  }
});
const view = new SceneView({
  map,
  zoom: 4,
  center: [-98, 35],
  container: "viewDiv"
});

// Step 3 Connect to portal
const portalUrl = "https://www.arcgis.com/sharing";
view.when(() => {
  // Step 1a: See if user is already signed-in
  IdentityManager.checkSignInStatus(portalUrl).always((info) => {
    // If user is logged-in update sign-in button and query items
    const user = info && info.userId ? info.userId : null;
    if (user) {
      getCredentials(info);
    } else {
      // Step 4a Query Items from portal
      loadPortal(user);
    }
  });
});

async function loadPortal(user) {
  const portal = new Portal();
  await portal.load();

  document.getElementById("title").innerHTML = `Explore ${portal.name ? portal.name : "Portal"}`;

  // Get a few items from the default portal or get a few
  // items from logged in user and display as thumbnails in side panel

  const layerTypes = '(type:("Feature Collection" OR "Feature Service" OR "Map Service" ) -typekeywords:"Table")  -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration" -type:"Map Area" -typekeywords:"MapAreaPackage"';

  const query = user ? `owner:${user} ${layerTypes}` : layerTypes;


  const itemResults = await portal.queryItems({
    extent: view.extent,
    query
  });


  // Step 4b: Deal with results
  displayItems(itemResults.results);

}



function displayItems(items) {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = `${items.map(item => `<div class="card leader-1">
  <figure class="card-image-wrap">
    <img class="card-image" src=${item.thumbnailUrl} alt/>
  </figure>
  <div class="card-content">
    <h5 >${item.title}</h5>
    <button data-item=${item.id} class="add-btn btn btn-fill">Add to Map</button>
  </div>
</div>`).join("")}`;
}


function handleAuthentication() {
  // Switch sign in / sign out links
  const signInButton = document.getElementById("signIn");
  const signOutButton = document.getElementById("signOut");

  IdentityManager.registerOAuthInfos([new OAuthInfo({
    appId: "Nrt2ESvH1cqQzSYa"
  })]);
  signInButton.addEventListener("click", () => {
    getCredentials();
  });
  signOutButton.addEventListener("click", () => {
    destroyCredentials();
  });
}

async function getCredentials(credential = null) {

  // If the user isn't already logged-in use getCredential
  // to kick-off the login process
  document.getElementById("signInNav").classList.add("hide");
  document.getElementById("userNav").classList.remove("hide");

  if (!credential) {
    credential = await IdentityManager.getCredential(portalUrl);
  }
  loadPortal(credential.userId);
  document.getElementById("userName").innerHTML = credential.userId;

}

function destroyCredentials() {
  IdentityManager.destroyCredentials();
  window.location.reload();
}