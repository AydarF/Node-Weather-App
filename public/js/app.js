const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".messageOne");
const precipitationData = document.querySelector(".precipitationData");
const weatherIcon = document.querySelector(".weatherIcon");
const iconAndTemp = document.querySelector(".iconAndTemp");
const temperature = document.querySelector(".temperature");
const weatherDescriptions = document.querySelector(".weatherDescriptions");
const feelsLike = document.querySelector(".feelsLike");
const windSpeed = document.querySelector(".windSpeed");
const windDirectionData = document.querySelector(".windDirectionData");
const details = document.querySelector(".details");
const humidityData = document.querySelector(".humidityData");
const pressureData = document.querySelector(".pressureData");
const visibilityData = document.querySelector(".visibilityData");
const uvIndexData = document.querySelector(".uvIndexData");

// This API is restricted, so good luck stealing it
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXlkYXJmIiwiYSI6ImNrYTBqeTdqcTFrN3UzZ21yYmV1cnlxemwifQ.keiVXWuzE5V8Glwmgs5CuA";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-71.057083, 42.361145],
  zoom: 10,
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.style.display = "block";
  messageOne.textContent = "Loading...";
  weatherIcon.style.display = "none";
  iconAndTemp.style.display = "none";
  details.style.display = "none";

  fetch(`/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          console.log(data.error);
        } else {
          iconAndTemp.style.display = "flex";
          weatherIcon.style.display = "block";
          details.style.display = "block";
          messageOne.textContent = `${data.location}`;
          precipitationData.textContent = `${data.precipitation}`;
          weatherIcon.style.backgroundImage = `url(${data.weather_icons}), linear-gradient(hsl(26, 24%, 42%), hsl(26, 24%, 42%))`;
          temperature.textContent = `${data.temperature}`;
          weatherDescriptions.textContent = `${data.weather_descriptions}`;
          feelsLike.textContent = `${data.feelslike}`;
          windSpeed.textContent = `${data.wind_speed}`;
          windDirectionData.textContent = `${data.wind_direction}`;
          humidityData.textContent = `${data.humidity}`;
          pressureData.textContent = `${data.pressure}`;
          visibilityData.textContent = `${data.visibility}`;
          uvIndexData.textContent = `${data.uv_index}`;

          map.flyTo({
            center: [`${data.longitude}`, `${data.latitude}`],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }
      });
    })
    .catch((error) => {
      messageOne.textContent =
        "This location doesn't seem to exist. Try to be more precise";
      console.log(error.message);
    });

  search.value = "";
});
