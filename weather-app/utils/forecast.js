const fetch = require("node-fetch");

const forecast = async (latitude, longitude, callback) => {
  const key = "254aeea3964dd7bea789e2155c4c971b";
  const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?units=si`;
  const response = await fetch(url).catch(error => {
    callback("Unable to connect to weather service");
    return;
  });
  if (!response) return;
  const data = await response.json();
  if (!data.currently) callback("Unable to find location");
  else {
    const { temperature, precipProbability } = data.currently;
    const { summary } = data.daily.data[0];
    callback(
      undefined,
      `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
    );
  }
};

module.exports = forecast;
