const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.WEATHERSTACK_API_KEY +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      console.log("Unable to connect to weather services ", undefined);
    } else if (body.error) {
      console.log(
        "Couldn't find the location. Try searching for something else... ",
        undefined
      );
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
