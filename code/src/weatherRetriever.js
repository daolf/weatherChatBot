/* @flow */
var fetch = require('node-fetch');

var getWeather = (location: string) :Object => {
  const api_key = process.env.OPEN_WEATHER_API_KEY || "";
  const queryUri = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID='+api_key;
  return fetch(queryUri).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  }).then((json) => json.weather[0].description);
};

module.exports = {
  getWeather: getWeather
}
