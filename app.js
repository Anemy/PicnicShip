'use strict';

var express = require('express');
var app = express();

// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// Root URL repsonds to HTTP GET, serves index.html file
app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

// Express Server listens on port 5000
app.listen(process.env.PORT || 5000);
