var mongoose = require('mongoose');
var TodoModel = require('../model/todomodel');

// Set mongoose.Promise to native es6 promise implementation
mongoose.Promise = Promise;

exports.postTodo = function postTodo(req, res, next) {
	var userid = req.params.userid;
	if(userid) {
		var newTodo = new TodoModel({
				title: req.body.title,
				user: userid
			});

		if(req.body.status) newTodo.status = req.body.time;
		if(req.body.description) newTodo.description = req.body.description;
		if(req.body.priority) newTodo.priority = req.body.priority;
		if(req.body.time) newTodo.time = req.body.time;

		newTodo.save()
			.then(function(todo) {
				res.json(todo);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required user params not set to post a todo!'));
	}
};

exports.getAllTodos = function getAllTodos(req, res, next) {
	var userid = req.params.userid;
	if(userid) {
		TodoModel.find({ user: userid })
			.populate('user', 'username gender')
			.then(function(todos) {
				res.json(todos);
			})
			.catch(function(err) {
				next(err);
			});
	} else {
		next(new Error('Required user params not set to get todos!'));
	}
};

exports.getTodo = function getTodo(req, res, next) {
	var userid = req.params.userid,
		todoid = req.params.todoid;
	if(userid) {
		if(todoid) {
			TodoModel.findById(todoid)
			.populate('user', 'username gender')
			.then(function(todo) {
				if(todo.user._id.toString() !== userid) {
					next(new Error('Cannot access todos other than your own'));
				} else {
					res.json(todo);
				}
			})
			.catch(function(err) {
				next(err);
			});
		} else {
			next(new Error('Required todo params not set to get todo!'));
		}
	} else {
		next(new Error('Required user params not set to get todo!'));
	}
};

exports.putTodo = function putTodo(req, res, next) {
	var userid = req.params.userid,
		todoid = req.params.todoid;
	if(userid) {
		if(todoid) {
			TodoModel.findById(todoid)
				.populate('user', 'username gender')
				.then(function(todo) {
					if(todo.user._id.toString() !== userid) {
						next(new Error('Cannot update todos other than your own'));
					} else {
						var updateDataObj = {};
						if(req.body.title) updateDataObj.title = req.body.title;
						if(req.body.description) updateDataObj.description = req.body.description;
						if(req.body.status) updateDataObj.status = req.body.status;
						if(req.body.priority) updateDataObj.priority = req.body.priority;
						if(req.body.time) updateDataObj.time = req.body.time;

						TodoModel.findByIdAndUpdate(todoid, { $set: updateDataObj })
							.then(function(todoBeforeUpdate) {
								res.json(todoBeforeUpdate);
							})
							.catch(function(err) {
								next(err);
							});
					}
				})
				.catch(function(err) {
					next(err);
				});
		} else {
			next(new Error('Required todo params not set to put todo!'));
		}
	} else {
		next(new Error('Required user params not set to put todo!'));
	}
};

exports.deleteTodo = function deleteTodo(req, res, next) {
	var userid = req.params.userid,
		todoid = req.params.todoid;
	if(userid) {
		if(todoid) {
			TodoModel.findById(todoid)
				.populate('user', 'username gender')
				.then(function(todo) {
					if(todo.user._id.toString() !== userid) {
						next(new Error('Cannot delete todos other than your own'));
					} else {
						TodoModel.findByIdAndRemove(todoid)
							.then(function(removedTodo) {
								res.json(removedTodo);
							})
							.catch(function(err) {
								next(err);
							});
					}
				})
				.catch(function(err) {
					next(err);
				});
		} else {
			next(new Error('Required todo params not set to delete todo!'));
		}
	} else {
		next(new Error('Required user params not set to delete todo!'));
	}
};