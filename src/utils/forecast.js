const request = require("postman-request");

function celsiusToFahrenheit(temp) {
  return Math.round(+temp * 1.8 + 32);
}

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.WEATHERSTACK_API_KEY +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log("Unable to connect to weather services. ", undefined);
    } else if (body.error) {
      console.log(
        "Couldn't find the location. Try searching for something else... ",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. 
        It's currently ${body.current.temperature}°C (${celsiusToFahrenheit(
          body.current.temperature
        )}°F) degrees.
         Feels like ${body.current.feelslike}°C (${celsiusToFahrenheit(
          body.current.feelslike
        )}°F). The chance of rain is ${body.current.humidity}%`
      );
    }
  });
};

module.exports = forecast;
