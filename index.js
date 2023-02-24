const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const btnLogout = document.getElementById("btn-logout");

// Add event listener
signUpForm && signUpForm.addEventListener("submit", handleSignUp);
loginForm && loginForm.addEventListener("submit", handleSignIn);
btnLogout && btnLogout.addEventListener("click", signOut);

// handle Sign Up
function handleSignUp(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  signUp(email, password);
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
function signUp(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      console.log("User signed up:", user);
      window.location.href = "index.html";

      // TODO: Handle success
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign-up error:", errorCode, errorMessage);
      // TODO: Handle error
    });
}

// Sign in function
function signIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      console.log("User signed in:", userCredential.user);
      window.location.href = "index.html";

      // TODO: Handle success
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign-in error:", errorCode, errorMessage);
      // TODO: Handle error
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
    console.log("User is signed in");
    document.querySelector(".logged-in-wrapper").style.display = "block";
    document.querySelector(".home").style.display = "none";
  } else {
    // User is signed out
    console.log("User is signed out");
    document.querySelector(".logged-in-wrapper").style.display = "none";
    document.querySelector(".home").style.display = "block";
  }
});
