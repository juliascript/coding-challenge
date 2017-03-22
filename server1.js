var express = require('express'),
	http = require('http'),
	usersRoute = require('./routes/users');

var app = express();

// uses the PORT environment variable, if available, otherwise uses port 3000
var port = process.env.PORT || 3000;

// global var for data being stored on server, would obviously use a db in production
var __users = { 'users' : [] }

// route for all users, passing in users obj
usersRoute(app, __users);

// allow requests through socket on port specified
app.listen(port);
console.log("Server is running...");