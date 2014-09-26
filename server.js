var express = require('express'),
  data = require('./lib/data'),
  config = require('./config')(),
  bodyParser = require('body-parser'),
  users = require('./lib/route_user'),
  app = express();

var jsonParser = bodyParser.json();

var sendError = function(response, msg, code) {
  response.status(code)
    .send('Ooops something went wrong: ' + msg)
    .end();
};

var sendResult = function(response, result, code) {
  response.status(code)
    .send(result)
    .end();
};

app.get('/users/:nickname(\\w+)/', function(request, response) {
  users.Get(request.params.nickname, function(err, result) {
    if (err) {
      sendError(response, err, 404);
    } else {
      sendResult(response, result, 200);
    }
  });
});

app.post('/users/authenticate', jsonParser, function(request, response) {
  users.AuthenticateUser(request.body, function(err, result) {
    if (err) {
      sendError(response, err, 500);
    } else {
      sendResult(response, null, 200);
    }
  });
});

app.post('/users', jsonParser, function(request, response) {
  users.Post(request.body, function(err, result) {
    if (err) {
      sendError(response, err, 500);
    } else {
      sendResult(response, result, 201);
    }
  });
});

console.log('Using appPort:' + config.appPort + ' mode:' + config.mode + ' mongoDbUrl:' + config.mongoDbUri);
app.listen(config.appPort);
data.connectToDb(config.mongoDbUri);