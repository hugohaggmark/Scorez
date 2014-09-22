var mongoose = require('mongoose'),
  schema = mongoose.Schema,
  User = mongoose.model('User', {
    nickname: String,
    displayNickName: String,
    name: String,
    hash: String
  });

module.exports.User = User;

var isNickNameInUse = function(nickname, callback) {
  getUser(nickname, function(err, user) {
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

module.exports.isNickNameInUse = isNickNameInUse;

module.exports.addUser = function(name, nickname, hash, callback) {
  isNickNameInUse(nickname, function(err, exists) {
    if (err) {
      callback(err, null);
      return;
    }

    if (exists === true) {
      callback('A user with the nickname:' + nickname + ' already exists!', null);
      return;
    } else {
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
    }
  });
};

var getUser = function(nickname, callback) {
  User
    .findOne({
      nickname: nickname.toLowerCase(),
    }, function(err, user) {
      callback(err, user);
    });
};

module.exports.getUser = getUser;

module.exports.updateUserName = function(nickname, newName, callback) {
  getUser(nickname, function(err, user) {
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

module.exports.updateUserHash = function(nickname, newHash, callback) {
  getUser(nickname, function(err, user) {
    if (err) {
      callback(err, null);
      return;
    }
    user.hash = newHash;
    user.save(function(err, dbUser) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, dbUser);
    });
  });
};

module.exports.updateUserNickName = function(nickname, newNickName, callback) {
  isNickNameInUse(newNickName, function(err, exists) {
    if (err) {
      callback(err, null);
      return;
    }

    if (exists === true) {
      callback('A user with the nickname:' + newNickName + ' already exists!', null);
      return;
    } else {
      getUser(nickname, function(err, user) {
        if (err) {
          callback(err, null);
          return;
        }

        user.nickname = newNickName.toLowerCase();
        user.displayNickName = newNickName;
        user.save(function(err, dbUser) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, dbUser);
        });
      });
    }
  });
};