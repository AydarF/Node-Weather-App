const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".messageOne");
const messageTwo = document.querySelector(".messageTwo");
const weatherIcon = document.querySelector(".weatherIcon");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "";
  messageTwo.textContent = "Loading...";
  weatherIcon.style.display = "none";

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
        console.log(data.error);
      } else {
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = `${data.forecast}`;
        weatherIcon.src = `${data.weather_icons}`;
        weatherIcon.style.display = "block";
      }
    });
  });

  search.value = "";
});
