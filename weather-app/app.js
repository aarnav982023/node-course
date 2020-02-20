const axios = require("axios");
const fetch = require("node-fetch");

const darkSkyKey = "254aeea3964dd7bea789e2155c4c971b";
const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyKey}/12.820960,77.659807?units=si`;

const location = "Los Angeles";
const geocodingKey =
  "pk.eyJ1Ijoic3RlZWxzbGF5ZXIiLCJhIjoiY2s2czNkZDRrMGNwcDNscnJpdHI4dmZzNyJ9.EEB16IGvQXulPfFErXnebA";
const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${geocodingKey}&limit=1`;

// fetch(darkSkyUrl)
//   .then(response => response.json())
//   .then(data => {
//     if (!data.currently) {
//       console.log(data.error);
//     } else {
//       const { temperature, precipProbability } = data.currently;
//       const { summary } = data.daily.data[0];
//       console.log(
//         `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
//       );
//     }
//   })
//   .catch(error => console.log("Unable to connect to weather service"));

fetch(geocodingUrl)
  .then(response => response.json())
  .then(data => {
    if (!data.features) console.log(data.message);
    else {
      const { center } = data.features[0];
      const latitude = center[1];
      const longitude = center[0];
      console.log(latitude, longitude);
    }
  })
  .catch(error => console.log("Unable to connect to geolocation request"));
