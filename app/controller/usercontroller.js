var mongoose = require('mongoose');
var UserModel = require('../model/usermodel');
var TodoModel = require('../model/todomodel');

// Set mongoose.Promise to native es6 promise implementation
mongoose.Promise = Promise;

exports.createUser = function createUser(req, res, next) {
	var newUser = new UserModel({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			gender: req.body.gender
		});

	if(req.body.age) newUser.age = req.body.age;
	if(req.body.country) newUser.country = req.body.country;

	newUser.save()
		.then(function(savedUser) {
			res.json(savedUser);
		})
		.catch(function(err) {
			next(err);
		});
};

exports.getUser = function getUser(req, res, next) {
	var id = req.params.userid;
	if(id) {
		UserModel.findById(id)
			.select('-password') // Do not send password of existing user back to him/anyone in N/W
			.then(function(user) {
				res.json(user);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required params not set to get user!'));
	}
};

exports.putUser = function putUser(req, res, next) {
	var id = req.params.userid;

	var updateDataObj = {};
	if(req.body.username) updateDataObj.username = req.body.username;
	if(req.body.gender) updateDataObj.gender = req.body.gender;
	if(req.body.age) updateDataObj.age = req.body.age;
	if(req.body.country) updateDataObj.country = req.body.country;

	/* Note: We cannot update password here since the middleware functions
	work only on 'save' and not 'update'. */
	if(id) {
		UserModel.findByIdAndUpdate(id, { $set: updateDataObj })
			.select('-password') // Do not send password of existing user back to him/anyone in N/W
			.then(function(userBeforeUpdate) {
				res.json(userBeforeUpdate);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required params not set to update user!'));
	}
};

exports.deleteUser = function deleteUser(req, res, next) {
	var id = req.params.userid;
	if(id) {
		UserModel.findByIdAndRemove(id)
			.then(function(user) {
				res.json(user);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required params not set to delete user!'));
	}
};

exports.getPendingTodos = function getPendingTodos(req, res, next) {
	var id = req.params.userid;
	if(id) {
		TodoModel.find({ status: false })
			.populate('user', 'username gender email')
			.then(function(pendingTodos) {
				res.json(pendingTodos);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required user params not set to get pending todos!'));
	}
};

exports.getCompletedTodos = function getCompletedTodos(req, res, next) {
	var id = req.params.userid;
	if(id) {
		TodoModel.find({ status: true })
			.populate('user', 'username gender email')
			.then(function(completedTodos) {
				res.json(completedTodos);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required user params not set to get completed todos!'));
	}
};

exports.deleteCompletedTodos = function deleteCompletedTodos(req, res, next) {
	var id = req.params.userid;
	if(id) {
		TodoModel.remove({ status: true })
			.then(function(deletedCompletedTodos) {
				res.json(deletedCompletedTodos);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required user params not set to delete completed todos!'));
	}
};

exports.getDelayedTodos = function getDelayedTodos(req, res, next) {
	var id = req.params.userid;
	if(id) {
		TodoModel.find({ status: false, time: { $lt: Date.now() } })
			.then(function(delayedTodos) {
				res.json(delayedTodos);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required user params not set to get delayed todos!'));
	}
};








