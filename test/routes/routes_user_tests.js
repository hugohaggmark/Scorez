var should = require('should'),
	testHelpers = require('../test_helpers'),
	db = require('../../lib/data_user'),
	config = require('../../config')('local'),
	route = require('../../lib/route_user');

describe('Post route', function() {

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

	it('posting a user returns the api address to the created user', function(done) {
		route.Post(testHelpers.testUser, function(err, result) {
			should.not.exists(err);
			result.href.should.be.equal(config.baseUrl + '/users/MadLazyDragon');
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

describe('Get route', function() {

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

	it('Get a user that exists returns user properties and hrefs to actions', function(done) {
		route.Post(testHelpers.testUser, function(err, result) {
			route.Get(testHelpers.testUser.nickname, function(err, result) {
				should.not.exists(err);
				should.not.exists(result._id);
				should.not.exists(result.__v);
				should.not.exists(result.displayNickName);
				should.not.exists(result.hash);
				result.nickname.should.be.equal('MadLazyDragon');
				result.name.should.be.equal('Hugo Häggmark');
				result.links.self.should.be.equal(config.baseUrl + '/users/MadLazyDragon');
				done();
			});
		});
	});

	it('Get a user by nickname that does not exists', function(done) {
		route.Get('', function(err, result) {
			should.exists(err);
			done();
		});
	});

	it('Get a user by an undefined nickname', function(done) {
		route.Get(null, function(err, result) {
			should.exists(err);
			done();
		});
	});

});