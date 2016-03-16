'use strict';

var express = require('express');
var app = express();

var portNum = (process.env.PORT || 8000);
app.set('port', portNum);

// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// Root URL repsonds to HTTP GET, serves index.html file
app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

var server = app.listen(app.get('port'), function () {
  console.log('the server is listening on port %s', app.get('port'));
});
