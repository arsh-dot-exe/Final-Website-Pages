const reflectionContainer = document.querySelector("[data-reflection-container]");
const reflectionGroupTemplate = document.querySelector("[data-culture-template]");
const searchInput = document.querySelector("[data-search]");

const no_data_heading = document.querySelector("#no_data_found");

let users = [];

db_ref = database.ref("reflections/");
db_ref.on("value", (snapshot) => {
  all_values = snapshot.val();
  sorted_values = sortCultures(all_values);

  if (sorted_values == null) {
    no_data_heading.classList.remove("hideElement");
  } else {
    no_data_heading.classList.add("hideElement");
  }

  sorted_values.forEach((culture) => {
    const reflection_group = reflectionGroupTemplate.content.cloneNode(true);

    const culture_heading = reflection_group.children[0].querySelector("[data-culture-heading]");
    culture_heading.textContent = culture[0].reflectionCulture;

    const reflectionCardTemplate = reflection_group.querySelector("[data-reflection-template]");
    const reflectionCardContainer = reflection_group.querySelector("[data-all-reflections]");

    let count = 0;
    culture.forEach((user) => {
      const card = reflectionCardTemplate.content.cloneNode(true).children[0];

      const username = card.querySelector("[data-username]");
      const user_culture = card.querySelector("[data-culture]");
      const userReflection = card.querySelector("[data-reflection]");
      const publishDate = card.querySelector("[data-publish-date]");

      if (count % 2 == 0) {
        card.classList.add("big");
        userReflection.textContent = cutWords(200, user.reflection);
      } else {
        userReflection.textContent = cutWords(70, user.reflection);
        card.classList.add("small");
      }

      username.textContent = user.name;
      user_culture.textContent = user.reflectionCulture;
      publishDate.textContent = toDateTime(user.timeAdded);

      if (count >= 2) {
        card.classList.add("hideElement2");
      }

      reflectionCardContainer.append(card);
      users.push({ name: user.name, culture: user.reflectionCulture, element: card });

      count++;
    });

    reflectionContainer.append(reflection_group);
  });
});

function toDateTime(secs) {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);

  date_day = t.getDate();
  date_month = t.getMonth();
  date_year = t.getFullYear();

  dateStr = date_day + "/" + date_month + "/" + date_year;
  return dateStr;
}

function sortCultures(all_values) {
  sorted_list = [];
  culture_names = [];

  // "Object.values() is an inbuilt JS function to get all Object values for ".forEach()" to work
  Object.values(all_values).forEach((user) => {
    culture_names.push(user.reflectionCulture);
  });

  culture_names = [...new Set(culture_names)];
  temp_values = Object.values(all_values);

  for (var culture of culture_names) {
    values_of_cult = [];
    for (var index in temp_values) {
      if (temp_values[index].reflectionCulture == culture) {
        values_of_cult.push(temp_values[index]);
      }
    }

    sorted_list.push(values_of_cult);
  }

  return sorted_list;
}

function cutWords(characterCount, str) {
  newStr = str.substring(0, characterCount) + "...";
  return newStr;
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value.toLowerCase());
  const value = e.target.value.toLowerCase();

  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) || user.culture.toLowerCase().includes(value);

    user.element.classList.toggle("hideElement", !isVisible);
  });

  $(".reflection__grp").each(function () {
    $(".culture__heading", this).toggle($(".reflection__card:visible", this).length != 0);
    $(".arrow", this).toggle($(".reflection__card:visible", this).length != 0);
  });
});
