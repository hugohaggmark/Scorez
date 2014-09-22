var should = require('should'),
  testHelpers = require('../test_helpers'),
  user = require('../../lib/data_user');

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
      testHelpers.validateOkTestUser(err, result);
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
        testHelpers.validateOkTestUser(err, result);
        done();
      });
    });
  });

  it('users nickname are not case sensitive', function(done) {
    testHelpers.addTestUser(function() {
      user.getUser(testHelpers.testUser2.nickname, function(err, result) {
        testHelpers.validateOkTestUser(err, result);
        done();
      });
    });
  });

  it('an existing nickname should be flagged as in use', function(done) {
    testHelpers.addTestUser(function() {
      user.isNickNameInUse(testHelpers.testUser.nickname, function(err, result) {
        should.not.exists(err);
        result.should.be.equal(true);
        done();
      });
    });
  });

  it('an nonexisting nickname should be flagged as unused', function(done) {
    testHelpers.addTestUser(function() {
      user.isNickNameInUse('TheDude', function(err, result) {
        should.not.exists(err);
        result.should.be.equal(false);
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
          result.nickname.should.be.equal('madlazydragon');
          result.displayNickName.should.be.equal('MadLazyDragon');
          result.name.should.be.equal('Kalle Anka');
          result.hash.should.be.equal('123456');
          done();
        });
      });
    });
  });

  it('users can update their hash', function(done) {
    testHelpers.addTestUser(function() {
      user.updateUserHash(testHelpers.testUser.nickname, '654321', function(err, result) {
        should.not.exists(err);
        user.getUser(testHelpers.testUser.nickname, function(err, result) {
          should.not.exists(err);
          result.nickname.should.be.equal('madlazydragon');
          result.displayNickName.should.be.equal('MadLazyDragon');
          result.name.should.be.equal('Hugo Häggmark');
          result.hash.should.be.equal('654321');
          done();
        });
      });
    });
  });

  it('users can update their nickname to a nickname that does not exist', function(done) {
    testHelpers.addTestUser(function() {
      user.updateUserNickName(testHelpers.testUser.nickname, 'LaZy', function(err, result) {
        should.not.exists(err);
        user.getUser('LaZy', function(err, result) {
          should.not.exists(err);
          result.nickname.should.be.equal('lazy');
          result.displayNickName.should.be.equal('LaZy');
          result.name.should.be.equal('Hugo Häggmark');
          result.hash.should.be.equal('123456');
          done();
        });
      });
    });
  });

  it('users can not update their nickname to a nickname if that already exist', function(done) {
    testHelpers.addTestUser(function() {
      user.updateUserNickName(testHelpers.testUser.nickname, 'MadLazyDragon', function(err, result) {
        should.exists(err);
        done();
      });
    });
  });

});