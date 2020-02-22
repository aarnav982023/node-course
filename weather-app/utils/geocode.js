const fetch = require("node-fetch");

const geocode = (address, callback) => {
  const key =
    "pk.eyJ1Ijoic3RlZWxzbGF5ZXIiLCJhIjoiY2s2czNkZDRrMGNwcDNscnJpdHI4dmZzNyJ9.EEB16IGvQXulPfFErXnebA";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}&limit=1`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.features.length)
        callback("Unable to find a location. Please try again.");
      else {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name
        });
      }
    })
    .catch(error => callback("Unable to connect to geolocation request"));
};

module.exports = geocode;
