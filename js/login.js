const loginForm = document.getElementById("login-form");

// Add event listener
loginForm.addEventListener("submit", handleLogin);

// handle Sign Up
function handleLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password);
}
