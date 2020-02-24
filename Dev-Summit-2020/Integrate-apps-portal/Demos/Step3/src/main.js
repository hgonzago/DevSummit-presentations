import WebMap from "esri/WebMap";
import SceneView from "esri/views/MapView";
import Portal from "esri/portal/Portal";
import OAuthInfo from "esri/identity/OAuthInfo";
import IdentityManager from "esri/identity/IdentityManager";


// Step 1 handle authentication
handleAuthentication();

// Step 2 create simple 3d (or 2d map)
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

const portalUrl = "https://www.arcgis.com/sharing";
view.when(() => {
  // Step 1a: See if user is already signed-in
  IdentityManager.checkSignInStatus(portalUrl).then((info) => {
    const user = info && info.userId ? info.userId : null;
    if (user) {
      getCredentials(info);
    } else {
      // anonymous user
      loadPortal();
    }
  }, (error) => {
    // anonymous user 
    loadPortal();
  });
});
// Step 3 Connect to portal
async function loadPortal() {
  const portal = new Portal();
  //portal.authMode = "immediate"; // This automaticaly prompts the user to sign in
  //portal.authMode is automatically
  await portal.load();
  /* Once portal is loaded set the app title to "Explore Portal" if anonymous
     or set to Explore <portal name> if logged in
  */
  document.getElementById("title").innerHTML = `Explore ${portal.name ? portal.name : "Portal"}`;

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
  document.getElementById("userName").innerHTML = credential.userId;
  loadPortal();
}

function destroyCredentials() {
  IdentityManager.destroyCredentials();
  window.location.reload();
}
