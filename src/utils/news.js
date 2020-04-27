const request = require("postman-request");

const news = (country, callback) => {
  const url =
    "http://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=" +
    process.env.NEWS_API;
};

request({ url, json: true }, (error, { body }) => {
  if (error) {
    console.log("Unable to connect to news services", undefined);
  } else if (body.error) {
    console.log("Couldn't find any new in the given location", undefined);
  } else {
    callback(undefined, body);
  }
});

module.exports = news;

// let req = new Request(url);

// fetch(req)
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     if (!data) {
//      return  console.log("No data fount");
//     }
//     if (data.error) {
//       return console.log(error);
//     }

//     console.log(data.articles[0].title);
//   });
