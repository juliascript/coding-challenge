var request = require('request');
var uuidV4 = require('uuid/v4');

// chose to use a randomly generated id versus a counter id 
// 	  because a counter id would allow a web scraper that 
//    loops over user id profile urls to collect all data in db
var uid = uuidV4();
var user = {};
var u = {};



user[uid] = { 	
				firstName 	: 'Julia',
				lastName  	: 'Geist',
				email		: 'testemail@gmail.com'
			};

user['id'] = uid;

u[uid] = {
			firstName : 'Jessica'
		 };

updatedUser = 	{
					firstName 	: 'Jessica',
					lastName  	: 'Geist',
					email		: 'testemail@gmail.com'
				};

describe("POST to /users", function() {
    it("should create a new user and return the created user object", function(done) {
        request({
		    url: "http://localhost:3000/users",
		    method: "POST",
		    json: true,   
		    body: user
		}, function (error, response, body){
			expect(body).toEqual(JSON.stringify(user[uid]));
			// expect stauts code 201
			// expect(response.statusCode).toBe(201);
			done();
		});
    });

    it("should return a 400 status code when there is a bad request made", function(done) {
        request({
		    url: "http://localhost:3000/users",
		    method: "POST",
		    json: true,   
		    body: user
		}, function (error, response, body){
			// expect status code to be 400
			// expect(response.status).toEqual(400);
			done();
		});
    });
});

describe("GET /user/:id", function() {
    it("should get a user's info", function(done) {
        request({
		    url: "http://localhost:3000/users/" + uid,
		    method: "GET"
		}, function (error, response, body){
			expect(body).toEqual(JSON.stringify(user[uid]));
			// expect status code 200
			done();
		});
    });

    it("should return 404 if user not found", function(done) {
        request({
		    url: "http://localhost:3000/users/" + uid,
		    method: "GET"
		}, function (error, response, body){
			// expect status code 404
			done();
		});
    });
});

describe("PATCH /users/:id", function() {
    it("should update a user and return the updated user object", function(done) {
        request({
		    url: "http://localhost:3000/users/" + uid,
		    json: true,
		    method: "PATCH",
		    body: u
		}, function (error, response, body){
			expect(body).toEqual(JSON.stringify(updatedUser));
			done();
		});
    });

    it("should return a 400 status code when there is a bad request made", function(done) {
        request({
		    url: "http://localhost:3000/users/" + uid,
		    json: true,
		    method: "PATCH",
		    body: u
		}, function (error, response, body){
			// expect status code to be 400
			// expect(response.status).toEqual(400);
			done();
		});
    });

    it("should return 404 if user not found", function(done) {
        request({
		    url: "http://localhost:3000/users/" + uid,
		    json: true,
		    method: "PATCH",
		    body: u
		}, function (error, response, body){
			// expect status code 404
			done();
		});
    });
});