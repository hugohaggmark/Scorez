var should = require('should'),
  dataHelpers = require('./data_helpers'),
  user = require('../../lib/data_user'),
  config = require('../../config')('local');

describe('Adding a user', function() {

  before(function(done) {
    dataHelpers.connectMongo();
    done();
  });

  beforeEach(function(done) {
    dataHelpers.deleteAll();
    done();
  });

  after(function(done) {
    dataHelpers.deleteAll();
    done();
  });

  it('should create a correct user', function(done) {
    user
      .addUser('Hugo Häggmark', 'MadLazyDragon', '123456', function(err, result) {
        should.not.exists(err);
        result._id.should.be.equal('madlazydragon');
        result.nickname.should.be.equal('MadLazyDragon');
        result.name.should.be.equal('Hugo Häggmark');
        result.hash.should.be.equal('123456');
        done();
      });
  });

  it('user nickname is unique', function(done) {
    user
      .addUser('Hugo Häggmark', 'MadLazyDragon', '123456', function(err, result) {
        user
          .addUser('Hugo Karlsson', 'MadLazyDragon', '123456', function(err, result) {
            should.exists(err);
            done();
          });
      });
  });

  it('user nickname is not case sensitive', function(done) {
    user
      .addUser('Hugo Häggmark', 'MadLazyDragon', '123456', function(err, result) {
        user
          .addUser('Hugo Karlsson', 'mAdLaZydrAgon', '123456', function(err, result) {
            should.exists(err);
            done();
          });
      });
  });
});