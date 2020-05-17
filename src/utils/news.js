const request = require("postman-request");

const news = (callback) => {
  const url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=" +
    process.env.NEWS_API;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to news services ", undefined);
    } else if (body.error) {
      callback("Couldn't find any news at this moment", undefined);
    } else if (body === undefined || body === null) {
      callback("Couldn't find any news at this moment", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = news;
