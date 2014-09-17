var express = require('express'),
  config = require('./config')(),
  app = express();

app.get('/', function(req, res) {
  res.send('hello world hugo');
});

console.log('Using appPort:' + config.appPort + ' mode:' + config.mode + ' mongoDbUrl:' + config.mongoDbUri);
app.listen(config.appPort);