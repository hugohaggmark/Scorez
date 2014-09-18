var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  User = mongoose.model('User', {
    _id: String,
    nickname: String,
    name: String,
    hash: String
  });

module.exports.User = User;

module.exports.addUser = function(name, nickname, hash, callback) {
  var user = new User();
  user._id = nickname.toLowerCase();
  user.nickname = nickname;
  user.name = name;
  user.hash = hash;

  User
    .create(user,
      function(err, dbUser) {
        if (err) {
          callback(err, null);
          return;
        }
        callback(err, dbUser);
      });
};

module.exports.getUser = function(nickname, callback) {
  User
    .findOne({
      _id: nickname.toLowerCase()
    }, function(err, user) {
      callback(err, user);
    });
};

module.exports.updateUserName = function(nickname, newName, callback) {
  this.getUser(nickname, function(err, user) {
    if (err) {
      callback(err, null);
      return;
    }
    user.name = newName;
    user.save(function(err, dbUser) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, dbUser);
    });
  });
};