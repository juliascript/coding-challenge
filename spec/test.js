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


// should create a user for julia geist, get the info, 
//   and then change the first name to jessica


// there is a bug that doesn't allow me to parse the json on the server,
// so unit tests are not working -- this file just makes the calls and 
// prints the response body to the console

request({
	    url: "http://localhost:3000/users",
	    method: "POST",
	    json: true,   
	    body: user
	}, function (error, response, body){
			console.log(body);

			request({
			    url: "http://localhost:3000/users/" + uid,
			    method: "GET"
			}, function (error, response, body){
					console.log(body);


				        request({
						    url: "http://localhost:3000/users/" + uid,
						    json: true,
						    method: "PATCH",
						    body: u
						}, function (error, response, body){
							
								console.log(body);

						});


			});



	});