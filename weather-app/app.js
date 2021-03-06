const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const location = process.argv[2];
if (!location) {
  console.log("Please provide a location");
  return;
}

geocode(location, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  forecast(data.latitude, data.longitude, (error, forecastData) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(data.location);
    console.log(forecastData);
  });
});
