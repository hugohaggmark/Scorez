var express = require('express'),
  data = require('./lib/data'),
  config = require('./config')(),
  bodyParser = require('body-parser'),
  users = require('./lib/route_user'),
  app = express();

var jsonParser = bodyParser.json();

app.get('/users/:nickname(\\w+)/', function(request, response) {
  users.Get(request.params.nickname, function(err, result) {
    if (err) {
      response.send('Ooops something went wrong: ' + err);
    } else {
      response.send(result);
    }
  });
});

app.post('/users', jsonParser, function(request, response) {
  users.Post(request.body, function(err, result) {
    if (err) {
      response.send('Ooops something went wrong: ' + err);
    } else {
      response.send(result);
    }
  });
});

console.log('Using appPort:' + config.appPort + ' mode:' + config.mode + ' mongoDbUrl:' + config.mongoDbUri);
app.listen(config.appPort);
data.connectToDb(config.mongoDbUri);