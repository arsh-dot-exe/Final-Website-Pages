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
var db_ref = database.ref("users/");

const userUid = sessionStorage.getItem("userUid");

const cultureContainer = document.querySelector("[data-culture-container]");
const cultureGroupTemplate = document.querySelector("[data-culture-group]");
const searchInput = document.querySelector("[data-search]");

const modal = document.querySelector("#modal");

let users = [];

db_ref.on(
  "value",
  (snapshot) => {
    all_values = snapshot.val();
    sorted_values = sortCultures(all_values);

    sorted_values.forEach((culture) => {
      const culture_group = cultureGroupTemplate.content.cloneNode(true);

      const culture_heading = culture_group.children[0].querySelector("[data-culture-heading]");
      culture_heading.textContent = culture[0].culture;

      const userCardContainer = culture_group.querySelector("[data-user-cards-container]");
      const userCardTemplate = culture_group.querySelector("[data-user-template]");

      culture.forEach((user) => {
        const card = userCardTemplate.content.cloneNode(true).children[0];

        const username = card.querySelector("[data-username]");
        const user_culture = card.querySelector("[data-culture]");
        const user_bio = card.querySelector("[data-user-bio]");

        username.textContent = user.user_name;
        user_culture.textContent = user.culture;
        user_bio.textContent = user.userBio;
        userCardContainer.append(card);

        users.push({ name: user.user_name, culture: user.culture, element: card });
      });

      cultureContainer.append(culture_group);
    });
  },
  (errorObject) => {
    console.log("The read failed: " + errorObject.name);
  }
);

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) || user.culture.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });

  $(".cult__grp").each(function () {
    // console.log($(".user__card:visible", this));

    return $(".culture__heading", this).toggle($(".user__card:visible", this).length != 0);
  });
});

function viewProfile(element) {
  card = element.parentNode;

  const username_value = card.querySelector("[data-username]").textContent;
  const user_culture_value = card.querySelector("[data-culture]").textContent;
  const user_bio_value = card.querySelector("[data-user-bio]").textContent;

  modal.showModal();

  const username_field = modal.querySelector("[data-modal-heading]");
  const culture_field = modal.querySelector("[data-modal-culture]");
  const bio_field = modal.querySelector("[data-modal-bio]");

  username_field.textContent = username_value;
  culture_field.textContent = user_culture_value;
  bio_field.textContent = user_bio_value;
}

function closeModal() {
  modal.close();
}

function modalYes() {
  alert(`This button will send notification to the other user for meeting`);
}

function sortCultures(all_values) {
  sorted_list = [];
  culture_names = [];

  // "Object.values() is an inbuilt JS function to get all Object values for ".forEach()" to work
  Object.values(all_values).forEach((user) => {
    culture_names.push(user.culture);
  });

  culture_names = [...new Set(culture_names)];
  temp_values = Object.values(all_values);

  for (var cult_name of culture_names) {
    values_of_cult = [];
    for (var index in temp_values) {
      if (temp_values[index].culture == cult_name) {
        values_of_cult.push(temp_values[index]);
      }
    }

    sorted_list.push(values_of_cult);
  }

  return sorted_list;
}

function toggleShown(element) {
  console.log(element.parentNode.parentNode);
  heading = element.parentNode.children[0].textContent;
}
