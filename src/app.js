const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const news = require("./utils/news");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(temp) {
  return Math.round(+temp * 1.8 + 32);
}

//Convert pressure (inches of mercury (inHg) and millibars)
function inchmercuryToMillibars(inHg) {
  let result = Number.parseFloat(inHg) * 0.02953;
  return result.toFixed(2);
}

//Chance of rain
function chanceOfRain(perc) {
  return Number(perc) * 10;
}

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aydar Fayzullin",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Aydar Fayzullin",
  });
});

app.get("/news", (req, res) => {
  res.render("news", {
    title: "News",
    name: "Aydar Fayzullin",
    message: "This is gonna be an awesome website!",
  });
});

app.get("/newsData", (req, res) => {
  news((error, newsData = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    res.send({ newsData });
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the location you're searching for",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          precipitation: `${chanceOfRain(forecastData.current.precip)}%`,
          location: location,
          temperature: `${
            forecastData.current.temperature
          }°C (${celsiusToFahrenheit(forecastData.current.temperature)}°F)`,
          weather_descriptions: forecastData.current.weather_descriptions,
          weather_icons: forecastData.current.weather_icons,
          address: req.query.address,
          feelslike: `Feels like ${
            forecastData.current.feelslike
          }°C (${celsiusToFahrenheit(forecastData.current.feelslike)}°F)`,
          wind_speed: `${forecastData.current.wind_speed}mph`,
          wind_direction: `${forecastData.current.wind_dir}`,
          humidity: `${forecastData.current.humidity}%`,
          pressure: `${inchmercuryToMillibars(
            forecastData.current.pressure
          )}in`,
          visibility: `${forecastData.current.visibility}mi`,
          uv_index: `${forecastData.current.uv_index}`,
          latitude: latitude,
          longitude: longitude,
        });
      });
    }
  );
});

app.get("/news/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aydar Fayzullin",
    errorMessage: "News article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aydar Fayzullin",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
