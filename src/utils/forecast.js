const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/30cee089f04883b994cbb280b55cd1c1/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    const current = body.currently;
    const daily = body.daily;

    if (error) {
      callback("Unable to connect to weather service", undefined);
    }
    else if (body.error) {
      callback(`Error: ${body.error}`, undefined);
    }
    else {
      callback(undefined, `${daily.data[0].summary} It is currently ${current.temperature} degrees out. This is a ${current.precipProbability}% chance of rain`)
    }
  });
};


module.exports = forecast;