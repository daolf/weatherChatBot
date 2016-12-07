// @flow
'use strict';

var Wit = require('node-wit').Wit;
var getWeather = require('../src/weatherRetriever.js').getWeather;

const accessToken = (() => {
  return process.env.WIT_ACCESS_TOKEN;
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart
const firstEntityValue = (entities: Object, entity: string): string => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return "";
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
          forecast: info
        };
        return context;
      }).catch((err) => {
      });
    } else {
      context.missingLocation = true;
      delete context.forecast;
      return context;
    }
  }
};

const client = new Wit({accessToken, actions});

var botFactory = ():Object => {
  return client;
};

module.exports = {
    botFactory: botFactory,
    firstEntityValue: firstEntityValue,
}
