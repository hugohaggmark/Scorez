var express = require('express'),
  config = require('./config')(),
  bodyParser = require('body-parser'),
  users = require('./lib/route_user'),
  app = express();

var jsonParser = bodyParser.json();

app.get('/', function(request, response) {
  response.send('hello world hugo');
});

app.post('/users', jsonParser, function(request, response) {
  console.log('req', request.body);
  response.send('kalle anka');
});

console.log('Using appPort:' + config.appPort + ' mode:' + config.mode + ' mongoDbUrl:' + config.mongoDbUri);
app.listen(config.appPort);