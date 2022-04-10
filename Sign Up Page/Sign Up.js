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

var userUid;

// Function to register first sign up page
function userRegister1(event) {
  const emailId = document.getElementById("emailId").value;
  const user_name = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (validatePassword() && password.length >= 6) {
    auth
      .createUserWithEmailAndPassword(emailId, password)
      .then(function () {
        console.log("creating user");
        var user = auth.currentUser;

        // Referance to Database
        var db_ref = database.ref();

        // Create user data
        var user_data = {
          email: emailId,
          user_name: user_name,
        };
        console.log(user_data);

        db_ref
          .child("users/" + user.uid)
          .set(user_data)
          .then(() => {
            sessionStorage.setItem("userUid", user.uid);
            userUid = user.uid;

            window.location.href = "Sign Up 2.html";
          });
      })
      .catch((error) => {
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
      });
  }

  event.preventDefault();
  return false;
}

// This function will register the second sign up page input fields
function userRegister2(event) {
  userUid = sessionStorage.getItem("userUid");
  if (userUid != undefined) {
    const culture = document.getElementById("culture").value;
    const phoneNum = document.getElementById("phoneNum").value;
    const userBio = document.getElementById("userBio").value;

    // Referance to Database
    var db_ref = database.ref("users/" + userUid);

    // Create user data
    var user_data = {
      culture: culture,
      phoneNumber: phoneNum,
      userBio: userBio,
    };

    console.log("users/" + userUid);
    db_ref
      .update(user_data)
      .then(() => {
        window.location.href = "/Content Page/Content.html";
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    alert("You have to fill the first page first.");
    window.location.href = "Sign Up 1.html";
  }

  event.preventDefault();
  return false;
}

// This function will validate the password inputted in the fields
function validatePassword() {
  password = document.getElementById("password").value;
  confirmPassword = document.getElementById("confirm_password").value;
  match__div = document.getElementById("match__div");

  if (password == confirmPassword) {
    match__div.style.visibility = "hidden";
    return true;
  } else {
    match__div.style.visibility = "visible";
    return false;
  }
}

// This function will be used in the second sign up page to go back
function goBack() {
  window.location.href = "Sign Up 1.html";
}
