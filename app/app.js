var bodyParser = require('body-parser');
var express = require('express');
var app = express(); // instantiate express app
var appRouter = require('./router/approuter');
var config = require('./config');

/* Authenticate using JSON web tokens */
var jwt = require('jsonwebtoken');

/* Connect to mongoose database */
require('mongoose').connect(config.db.url, { useMongoClient: true }); // useMongoClient is must in new mongoose versions

/* App middleware */
require('./middleware/app-middleware.js')(app);

/* Routes */
app.use('/', appRouter);

/* Error handling */
app.use(function(err, req, res, next) {
	console.log('Error occurred! : ', err);
	res.status(500).send({ error: 1, error_msg: err.toString() });
});

/* Specify Port */
app.listen(config.port, function() {
    console.log('Listening on port ' + config.port);
});