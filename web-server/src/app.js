const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const app = express();
const port = proccess.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aarnav Singh"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpfull text",
    title: "Help",
    name: "Aarnav Singh"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aarnav Singh"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address" });
    return;
  }
  const location = req.query.address;
  geocode(location, (error, data) => {
    if (error) {
      res.send({ error });
      return;
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        res.send({ error });
        return;
      }
      console.log(data.location);
      console.log(forecastData);
      res.send({
        forecast: forecastData,
        location: data.location,
        address: location
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide a search term" });
    return;
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
