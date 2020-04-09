const path = require("path");
const express = require("express");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aydar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aydar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "About Me",
    name: "Aydar",
    message: "This this gonna be an awesome website",
  });
});

app.get("/weather", (req, res) => {
  res.send({ forecast: "It's gonna be hot", location: "in Boston" });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000...");
});
