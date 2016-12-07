/* @flow */
/* global describe it */

var assert = require('assert');
var getWeather = require('../src/weatherRetriever.js').getWeather;

describe('Weather', function () {
  it('Should return the weather of paris', function (done) {
    getWeather('Paris').then((info) => {
      assert(info);
      done();
    });
  });
  it('Should not be able of returning weather of xxxx', function (done) {
    getWeather('zzzzz').catch(err => {
      assert(err);
      done();
    });
  });
});
