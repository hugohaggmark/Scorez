var should = require('should'),
	testHelpers = require('../test_helpers'),
	db = require('../../lib/data_user'),
	route = require('../../lib/route_user');

describe('Posting users', function() {

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

	it('posting a user stores it in database', function(done) {
		route.Post(testHelpers.testUser.nickname, testHelpers.testUser.name, testHelpers.testUser.hash, function(err, result) {
			db.getUser(testHelpers.testUser.nickname, function(err, dbUser) {
				testHelpers.validateOkTestUser(err, dbUser);
				done();
			});
		});
	});

	it('posting a user returns the api address to the user', function(done) {
		route.Post(testHelpers.testUser.nickname, testHelpers.testUser.name, testHelpers.testUser.hash, function(err, result) {
			should.not.exists(err);
			result.should.be.equal('/users/madlazydragon');
			done();
		});
	});

});