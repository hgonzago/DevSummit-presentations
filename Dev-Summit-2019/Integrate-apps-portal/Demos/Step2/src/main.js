import WebMap from "esri/WebMap";
import SceneView from "esri/views/SceneView";
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
  IdentityManager.checkSignInStatus(portalUrl).always((info) => {
    // If user is logged-in update sign-in
    const user = info && info.userId ? info.userId : null;
    if (user) {
      getCredentials(info);
    }
  });
});

function handleAuthentication() {
  const signInButton = document.getElementById("signIn");
  const signOutButton = document.getElementById("signOut");

  IdentityManager.registerOAuthInfos([new OAuthInfo({
    appId: "b3S1dvKs0rI5WJuU"
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

}

function destroyCredentials() {
  IdentityManager.destroyCredentials();
}
