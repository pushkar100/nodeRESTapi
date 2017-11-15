var bodyParser = require('body-parser');
var morgan = require('morgan');

/* App Middleware */
module.exports = function(app) {
	app.use(morgan('dev')); // Logging req info to console
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false })); // `true` only required if post body is heavily nested!
}