bodyParser = require('body-parser');

module.exports = function(app, __users) { 

	// create json parser
	var jsonParser = bodyParser.json();

	// creating a new user
	app.post('/users', jsonParser, function(req, res){
		if (!req.body) return res.sendStatus(400);
		
		// push body obj onto users array
		__users['users'].push(req.body);

		// get uid from body object
		var uid = Object.keys(req.body)[0];

		// return newly created user obj in JSON with status code 201
		res.status(201).send(JSON.stringify(__users['users'][0][uid]));
	});

	// getting a user
	app.get('/users/:uid', function(req, res){
		// get the uid from the url path
		var uid = req.params.uid;

		// if user id not found, send 404 status code
		if (!__users['users'][0][uid]) return res.sendStatus(404);

		// otherwise, send the user obj in JSON
		res.send(JSON.stringify(__users['users'][0][uid]));

	});

	// updating a user
	app.patch('/users/:uid', jsonParser, function(req, res){
		if (!req.body) return res.sendStatus(400);


		// get uid from body obj
		var uid = Object.keys(req.body)[0];

		// if the user doesn't exist, return error status code
		if (!__users['users'][0][uid]) return res.sendStatus(404);

		// if the user exists, loop over the given values and update
		u = __users['users'][0][uid];
		body = req.body[uid];

		for (var key in body) {
			// making sure the key is not a property on obj from prototypal inheritance
			if (body.hasOwnProperty(key)){
				u[key] = body[key];
			}
		}

		// return updated object
		res.send(JSON.stringify(u));
	});


}