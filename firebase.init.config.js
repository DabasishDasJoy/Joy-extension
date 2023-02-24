const firebaseConfig = {
  apiKey: "AIzaSyBsO1IRO-b8prLrFT2PUI_5iCvecYxouEw",
  authDomain: "joy-extension.firebaseapp.com",
  projectId: "joy-extension",
  storageBucket: "joy-extension.appspot.com",
  messagingSenderId: "840897887551",
  appId: "1:840897887551:web:58481d18d2b5908c51a78a",
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.error(err);
}
