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
// var db_ref = database.ref("");

const userUid = sessionStorage.getItem("userUid");

const addModal = document.querySelector("#add_reflection_modal");

if (userUid != null) {
} else {
  alert("You must be signed in to add reflections!");
  window.location.href = "/Final-Website-Pages/Sign In Page/Sign In.html";
}

function addReflection() {
  culture_input = document.getElementById("reflection_culture");
  reflection__input = document.getElementById("reflection");

  if (inputValidation) {
    var db_ref = database.ref();

    let profileData;
    db_ref.child("users/" + userUid).on("value", async (snapshot) => {
      profileData = snapshot.val();

      var reflectionData = {
        name: profileData.user_name,
        userCulture: profileData.culture,
        reflectionCulture: culture_input.value,
        reflection: reflection__input.value,
        timeAdded: firebase.firestore.Timestamp.now().seconds,
      };

      db_ref
        .child("reflections/")
        .push(reflectionData)
        .then(() => {
          culture_input.value = "";
          reflection__input.value = "";

          closeModal();

          document.location.reload();
        });
    });
  }
}

function inputValidation() {
  culture_input = document.getElementById("reflection_culture");
  reflection__input = document.getElementById("reflection");

  if (culture_input.value.length > 4) {
    if (wordCount(reflection__input) > 100) {
      return true;
    } else {
      alert("For a substantial reflection, the word count must be greater than 100 words!");
      return false;
    }
  } else {
    alert("The culture input must be greater than 4 characters!");
    return false;
  }
}

function wordCount(str) {
  return str.value.split(" ").length;
}

function openReflectionDialog() {
  addModal.showModal();
}

function closeModal() {
  addModal.close();
}
