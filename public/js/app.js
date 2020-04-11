const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const searchResult = document.querySelector(".result");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log("Error: ", data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
  });

  search.value = "";
});
