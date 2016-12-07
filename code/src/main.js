// @flow
'use strict';

var Wit = require('node-wit').Wit;
var interactive = require('node-wit').interactive;
var getWeather = require('../src/weatherRetriever.js').getWeather;

const accessToken = (() => {
  return process.env.WIT_ACCESS_TOKEN;
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send (request, response) {
    console.log('sending...', JSON.stringify(response));
  },
  getForecast ({context, entities}) {
    var location = firstEntityValue(entities, 'location');
    if (location) {
      return getWeather(location).then((info) => {
        var context = {
          forecast: info.weather[0].description
        };
        console.log(context.forecast);
        return context;
      }).catch((err) => {
        console.log(err);
      });
    } else {
      context.missingLocation = true;
      delete context.forecast;
      return context;
    }
  }
};

const client = new Wit({accessToken, actions});
interactive(client);
