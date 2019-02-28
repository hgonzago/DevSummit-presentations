import OAuthInfo from "esri/identity/OAuthInfo";
import IdentityManager from "esri/identity/IdentityManager";



// Step 1 handle authentication
handleAuthentication();


const portalUrl = "https://www.arcgis.com/sharing";

// Step 1a: See if user is already signed-in
IdentityManager.checkSignInStatus(portalUrl).always((info) => {
  const user = info && info.userId ? info.userId : null;
  if (user) {
    getCredentials(info);
  } else {
    // No one is logged in so we'll get anonymous content from portal
  }
});

/* Handle Authentication
  Registers the app with identity manager
  Sets up click event handlers for sign in and sign out button

*/
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
/* Get Credentials is called when user clicks the Sign in link.
It switches from sign-in to sign out*/
async function getCredentials(credential = null) {
  // Toggle sign-in links (signin/signout)
  document.getElementById("signInNav").classList.add("hide");
  document.getElementById("userNav").classList.remove("hide");

  if (!credential) {
    // If we don't have a credential no one is logged in so
    // use getCredential to prompt for credentials
    credential = await IdentityManager.getCredential(portalUrl);
  }
  // Update the sign-in link to include logged in users name
  document.getElementById("userName").innerHTML = credential.userId;
}

function destroyCredentials() {
  // Sign Out
  IdentityManager.destroyCredentials();
}
