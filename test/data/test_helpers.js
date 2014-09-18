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

module.exports.addTestUser = function(callback) {
  user.addUser(this.testUser.name, this.testUser.nickname, this.testUser.hash, callback);
};

module.exports.addTestUser2 = function(callback) {
  user.addUser(this.testUser2.name, this.testUser2.nickname, this.testUser2.hash, callback);
};

module.exports.testUser = {
  nickname: 'MadLazyDragon',
  name: 'Hugo Häggmark',
  hash: '123456'
};

module.exports.testUser2 = {
  nickname: 'mAdlaZydrAgon',
  name: 'Hugo Häggmark',
  hash: '123456'
};