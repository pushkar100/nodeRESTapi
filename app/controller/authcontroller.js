var jwt = require('jsonwebtoken');
var UserModel = require('../model/usermodel');
var config = require('../config');

/* 'authenticate' will be used just as a middleware before secure routes */
exports.authenticate = function(req, res, next) {
	/* Allow token to be passed in the request body or as a header */
	var token = req.body.token || req.headers['token'];
	if(token) {
		var decodedUser = jwt.verify(token, config.jwt.secretKey);
		UserModel.findById(decodedUser._id)
			.then(function(user) {
				/* Check if decoded user is the same one who's userid is set in params */
				if(req.params.userid) { // Only if userid is included in params (url)
					if(req.params.userid == user._id) {
						next();
					} else {
						next(new Error('Cannot access another user\'s account'));
					}
				} else {
					// No user id in params? no problem - certain routes don't require it.
					next(); // call the next function in queue
				}
			})
			.catch(function(err) {
				next(err);
			})
	} else {
		next(new Error('No token received to validate user'));
	}
};

exports.userSignIn = function userSignIn(req, res, next) {
	var email = req.body.email,
		password = req.body.password;

	// if no username or password then send a message:
    if (!email || !password) {
      next(new Error('You need an email and password'));
    } else {
    	UserModel.findOne({ email: email }) // email must be unique acc. to user schema
    		.then(function(user) {
    			/* Check if user's password matches first: */
    			user.comparePassword(password, function(err, isMatched) {
    				if(err) return next(err);

    				if(isMatched) {
    					var userIdEmail = {
		    					_id: user._id,
		    					email: user.email,
		    					gender: user.gender,
		    					age: user.age
			    			};

			    		var token = jwt.sign(userIdEmail, config.jwt.secretKey, { 
			    				expiresIn: config.jwt.expiresIn
			    			});

			    		res.json({
			    			success: true,
			    			token: token,
			    			id: user._id
			    		});
    				} else {
    					res.json({
			    			success: false,
			    			message: 'Unauthorized access'
			    		});
    				}
    			});
    		})
    		.catch(function(err) {
    			next(err);
    		});
    }
};