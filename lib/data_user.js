var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  User = mongoose.model('User', {
    nickname: String,
    displayNickName: String,
    name: String,
    hash: String
  });

module.exports.User = User;

module.exports.isNickNameInUse = function(nickname, callback) {
  this.getUser(nickname, function(err, user) {
    if (err) {
      callback(err, false);
      return;
    }

    if (user) {
      callback(null, true);
      return;
    }

    callback(null, false);
  });
};

module.exports.addUser = function(name, nickname, hash, callback) {
  this.isNickNameInUse(nickname, function(err, exists) {
    if (err) {
      callback(err, null);
      return;
    }

    if (exists === true) {
      callback('A user with the nickname:' + nickname + 'already exists!', null);
      return;
    }

    var user = new User();
    user.nickname = nickname.toLowerCase();
    user.displayNickName = nickname;
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
  });
};

module.exports.getUser = function(nickname, callback) {
  User
    .findOne({
      nickname: nickname.toLowerCase(),
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