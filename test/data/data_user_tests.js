var should = require('should'),
  testHelpers = require('./test_helpers'),
  user = require('../../lib/data_user'),
  config = require('../../config')('local');

describe('Adding users', function() {

  before(function(done) {
    testHelpers.connectMongo();
    done();
  });

  beforeEach(function(done) {
    testHelpers.deleteAll();
    done();
  });

  after(function(done) {
    testHelpers.deleteAll();
    done();
  });

  it('users have the correct properties stored', function(done) {
    testHelpers.addTestUser(function(err, result) {
      should.not.exists(err);
      result._id.should.be.equal('madlazydragon');
      result.nickname.should.be.equal('MadLazyDragon');
      result.name.should.be.equal('Hugo Häggmark');
      result.hash.should.be.equal('123456');
      done();
    });
  });

  it('users nickname are unique', function(done) {
    testHelpers.addTestUser(function(err, result) {
      testHelpers.addTestUser(function(err, result) {
        should.exists(err);
        done();
      });
    });
  });

  it('users nickname are not case sensitive', function(done) {
    testHelpers.addTestUser(function(err, result) {
      testHelpers.addTestUser2(function(err, result) {
        should.exists(err);
        done();
      });
    });
  });
});

describe('Listing users', function() {

  before(function(done) {
    testHelpers.connectMongo();
    done();
  });

  beforeEach(function(done) {
    testHelpers.deleteAll();
    done();
  });

  after(function(done) {
    testHelpers.deleteAll();
    done();
  });

  it('users can be found by nickname', function(done) {
    testHelpers.addTestUser(function() {
      user.getUser(testHelpers.testUser.nickname, function(err, result) {
        should.not.exists(err);
        result._id.should.be.equal('madlazydragon');
        result.nickname.should.be.equal('MadLazyDragon');
        result.name.should.be.equal('Hugo Häggmark');
        result.hash.should.be.equal('123456');
        done();
      });
    });
  });

  it('users nickname are not case sensitive', function(done) {
    testHelpers.addTestUser(function() {
      user.getUser(testHelpers.testUser2.nickname, function(err, result) {
        should.not.exists(err);
        result._id.should.be.equal('madlazydragon');
        result.nickname.should.be.equal('MadLazyDragon');
        result.name.should.be.equal('Hugo Häggmark');
        result.hash.should.be.equal('123456');
        done();
      });
    });
  });
});

describe('Updating users', function() {

  before(function(done) {
    testHelpers.connectMongo();
    done();
  });

  beforeEach(function(done) {
    testHelpers.deleteAll();
    done();
  });

  after(function(done) {
    testHelpers.deleteAll();
    done();
  });

  it('users can update their name', function(done) {
    testHelpers.addTestUser(function() {
      user.updateUserName(testHelpers.testUser.nickname, 'Kalle Anka', function(err, result) {
        should.not.exists(err);
        user.getUser(testHelpers.testUser.nickname, function(err, result) {
          should.not.exists(err);
          result._id.should.be.equal('madlazydragon');
          result.nickname.should.be.equal('MadLazyDragon');
          result.name.should.be.equal('Kalle Anka');
          result.hash.should.be.equal('123456');
          done();
        });
      });
    });
  });
});