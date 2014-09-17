var should = require('should'),
  data = require('../../lib/data'),
  user = require('../../lib/data_user'),
  config = require('../../config')('local'),
  mongoose = require("mongoose");

module.exports.connectMongo = function() {
  data.connectToDb(config.mongoDbUri);
};

module.exports.deleteAll = function() {
  user.User.remove({}, function(err) {
    if (err) {
      console.log("Couldn't delete all documents\n" + err);
    }
  });
};