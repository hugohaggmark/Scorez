var user = require('./data_user');


module.exports.Post = function(nickname, name, hash, callback) {
  user.addUser(nickname, name, hash, function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, '/users/' + result.nickname);
    }
  });
};