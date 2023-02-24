const signUpForm = document.getElementById("signup-form");

// Add event listener
signUpForm.addEventListener("submit", handleSignUp);

// handle Sign Up
async function handleSignUp(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  signUp(email, password);
}

// Handle sign-in state changes
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    console.log("User is signed in");
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});

// Sign up function
function signUp(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      console.log("User signed up:", user);
      // TODO: Handle success
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign-up error:", errorCode, errorMessage);
      // TODO: Handle error
    });
}
