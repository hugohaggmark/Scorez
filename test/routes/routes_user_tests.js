var should = require('should'),
	testHelpers = require('../test_helpers'),
	db = require('../../lib/data_user'),
	config = require('../../config')('local'),
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
		route.Post(testHelpers.testUser, function(err, result) {
			db.getUser(testHelpers.testUser.nickname, function(err, dbUser) {
				testHelpers.validateOkTestUser(err, dbUser);
				done();
			});
		});
	});

	it('posting a user returns the api address to the user', function(done) {
		route.Post(testHelpers.testUser, function(err, result) {
			should.not.exists(err);
			result.href.should.be.equal(config.baseUrl + '/users/madlazydragon');
			done();
		});
	});

	it('posting a user missing a nickname should return an error', function(done) {
		var user = {
			name: 'Kalle',
			hash: '123456'
		};
		route.Post(user, function(err, result) {
			should.exists(err);
			done();
		});
	});

	it('posting a user missing a name should return an error', function(done) {
		var user = {
			nickname: 'Kalle',
			hash: '123456'
		};
		route.Post(user, function(err, result) {
			should.exists(err);
			done();
		});
	});

	it('posting a user missing a hash should return an error', function(done) {
		var user = {
			nickname: 'Kalle',
			name: 'Olle'
		};
		route.Post(user, function(err, result) {
			should.exists(err);
			done();
		});
	});

});