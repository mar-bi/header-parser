// server.js

var express = require('express');
var app = express();

app.get('/api/whoami', function (req, res) {
  const agent = req.get('User-Agent'),
        lang = req.get('Accept-Language'),
        ip = req.ip;

  const resObj = {
    ipadress: getIP(ip),
    language: getLanguage(lang),
    software: getSoftware(agent)
  };
  res.json(resObj);
});

app.get('/', function (req, res) {
  res.status(404).send(
    'The page is not found. Try https://apricot-piper.glitch.me/api/whoami/');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// helper functions
var getLanguage = function (str) {
  const index = str.indexOf(';');
  return str.slice(0, index);
};

var getSoftware = function (str) {
  const start_index = str.indexOf('(') + 1,
        end_index = str.indexOf(')');
  return str.slice(start_index, end_index);
};

var getIP = function(str) {
  const index = str.search(/(\d)/);
  return str.slice(index);
}
