const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const btnLogout = document.getElementById("btn-logout");
const loggedInMessage = document.querySelector(".logged-in-wrapper");
const home = document.querySelector(".home");
const btnProfile = document.getElementById("btn-profile");
let userEmail = "";

// Add event listener
signUpForm && signUpForm.addEventListener("submit", handleSignUp);
loginForm && loginForm.addEventListener("submit", handleSignIn);
btnLogout && btnLogout.addEventListener("click", signOut);
btnProfile && btnProfile.addEventListener("click", loadProfile);

// loadProfile
function loadProfile() {
  fetch(`https://joy-extension-server.vercel.app/users?email=${userEmail}`, {
    method: "GET", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      document.getElementById("profile").innerHTML = `
        <p>Email: ${data.email}</p>
        <p>Name: ${data.name}</p>
      `;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "signUp-error-message"
      ).innerHTML = `<p> ${error}</p>`;
    });
}

// handle Sign Up
function handleSignUp(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const name = event.target.name.value;
  signUp(email, password, name);
}

// handle Sing in
function handleSignIn(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password);

  signIn(email, password);
}

// Sign up function
function signUp(email, password, name) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      console.log("User signed up:", user);
      createUser(email, name);

      // TODO: Handle success
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign-up error:", errorCode, errorMessage);
      // TODO: Handle error
      document.getElementById(
        "signUp-error-message"
      ).innerHTML = `<p> ${error}</p>`;
    });
}

function createUser(email, name) {
  fetch("https://joy-extension-server.vercel.app/users", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById(
        "signUp-error-message"
      ).innerHTML = `<p> ${error}</p>`;
    });
}

// Sign in function
function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Handle success
      console.log("User signed in:", userCredential.user);
      window.location.href = "index.html";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign-in error:", errorCode, errorMessage);
      // Handle error
      document.getElementById(
        "login-error-message"
      ).innerHTML = `<p> ${error}</p>`;
    });
}
// Signout
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User signed out successfully.");
      // Redirect the user to the sign-in page or homepage
      // window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

// Handle sign-in state changes
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("User is signed in", user);
    userEmail = user.email;
    if (loggedInMessage) loggedInMessage.style.display = "block";
    if (home) home.style.display = "none";
  } else {
    // User is signed out
    console.log("User is signed out");
    userEmail = "";
    if (loggedInMessage) loggedInMessage.style.display = "none";
    if (home) home.style.display = "block";
  }
});
