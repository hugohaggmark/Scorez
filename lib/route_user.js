var user = require('./data_user');


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
      callback(null, '/users/' + result.nickname);
    }
  });
};