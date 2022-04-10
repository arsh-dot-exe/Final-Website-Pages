const firebaseConfig = {
  apiKey: "AIzaSyC9s_hzLcJwxlm-CsOF0rrQ3H9xDu3hhvw",
  authDomain: "dd-find-culture-website.firebaseapp.com",
  databaseURL: "https://dd-find-culture-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dd-find-culture-website",
  storageBucket: "dd-find-culture-website.appspot.com",
  messagingSenderId: "363929239376",
  appId: "1:363929239376:web:708eefe00d70123082f655",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initalize Variables
const auth = firebase.auth();
const database = firebase.database();

function userLogin(event) {
  const emailId = document.getElementById("email__input").value;
  const password = document.getElementById("password__input").value;

  auth
    .signInWithEmailAndPassword(emailId, password)
    .then(() => {
      user = auth.currentUser;

      sessionStorage.setItem("userUid", user.uid);
      userUid = user.uid;

      window.location.href = "/Content Page/Content.html";
    })
    .catch((error) => {
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });

  event.preventDefault();
  return false;
}
