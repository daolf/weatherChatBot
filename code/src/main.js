var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var botClient = require('./chatBot.js')();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.post('/', function (req, res) {
  var text = req.body.text;
  var context = {};
  var msg = '';
  botClient.runActions('id', text, context).then((data) => {
    // The following logic is already in the botClient
    // I did not manage to reuse it from the API.
    if (data.forecast) {
      msg = `The weather will be ${data.forecast}`;
      context = {};
    } else if (data.missingLocation) {
      msg = `Where ?`;
    } else {
      msg = 'I did not understand';
    }
    io.sockets.emit('message', { msg });
  }).catch(console.error);
});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var io = require('socket.io')(server);
