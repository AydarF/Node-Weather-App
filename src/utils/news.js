const request = require("postman-request");

const news = (callback) => {
  const url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=" +
    process.env.NEWS_API;
	
	const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36" 
  }

  request({ url, headers, json: true }, (error, { body } = {}) => {
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
