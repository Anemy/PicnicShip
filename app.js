'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Serve assets in /public.
app.use(express.static(__dirname + '/public'));

// Allow POSTing JSON.
app.use(bodyParser.json());

// Root URL repsonds to HTTP GET, serves index.html file
app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

// Express Server listens on port 5000
app.listen(process.env.PORT || 5000);

function autocomplete(query) { 
  return ['hi'];
}

app.post('/query', function(req, res) {
  var query = req.body.query;
  res.json(autocomplete(query));
});
