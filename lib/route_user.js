var user = require('./data_user'),
  config = require('../config')();

var getSelfUrl = function(nickname) {
  return config.baseUrl + '/users/' + nickname;
};

module.exports.Get = function(nickname, callback) {
  user.getUser(nickname, function(err, result) {
    if (err) {
      callback(err, null);
      return;
    }

    if (result) {
      var user = {
        nickname: result.displayNickName,
        name: result.name,
        links: {
          self: getSelfUrl(result.displayNickName)
        }
      };
      callback(null, user);
      return;
    }

    callback('Could not find a user with nickname: ' + nickname, null);
  });
};

module.exports.Post = function(postedUser, callback) {
  if (postedUser === undefined || postedUser === null) {
    callback('User must have a nickname, name and hash', null);
    return;
  }

  if (postedUser.nickname === undefined || postedUser.nickname === null) {
    callback('User must have a nickname', null);
    return;
  }

  if (postedUser.name === undefined || postedUser.name === null) {
    callback('User must have a name', null);
    return;
  }

  if (postedUser.hash === undefined || postedUser.hash === null) {
    callback('User must have a hash', null);
    return;
  }

  user.addUser(postedUser.nickname, postedUser.name, postedUser.hash, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      var response = {
        href: getSelfUrl(result.displayNickName)
      };
      callback(null, response);
    }
  });
};

module.exports.AuthenticateUser = function(postedUser, callback) {
  if (postedUser === undefined || postedUser === null) {
    callback('Body must have a nickname and hash', null);
    return;
  }

  if (postedUser.nickname === undefined || postedUser.nickname === null) {
    callback('Body must have a nickname', null);
    return;
  }

  if (postedUser.hash === undefined || postedUser.hash === null) {
    callback('Body must have a hash', null);
    return;
  }

  var errMsg = 'Failed to authenticate user with nickname: ' + postedUser.nickname;
  user.getUser(postedUser.nickname, function(err, result) {
    if (err) {
      callback(errMsg, false);
      return;
    }

    if (result) {
      if (postedUser.hash === result.hash) {
        callback(null, true);
        return;
      }

      if (postedUser.hash !== result.hash) {
        callback(errMsg, false);
        return;
      }
    }

    callback(errMsg, false);
  });
};