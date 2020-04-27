const request = require("postman-request");

const news = (callback) => {
  const url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=" +
    process.env.NEWS_API;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      console.log("Unable to connect to news services", undefined);
    } else if (body.error) {
      console.log("Couldn't find any new in the given location", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = news;
