var router = require('express').Router({ mergeParams: true }); // Access to parent router's params
var todoRouter = require('./todorouter');
var userController = require('../controller/usercontroller');
var authController = require('../controller/authcontroller');

/* Handle basic user route to create a user (sign up) */
router.route('/')
	.post(userController.createUser);

/* Mention the authentication middleware while doing anything related to user: */
router.use('/:userid', authController.authenticate);

/* Handle user specific routes */
router.route('/:userid')
	.get(userController.getUser)
	.put(userController.putUser)
	.delete(userController.deleteUser);

router.route('/:userid/pendingtodos')
	.get(userController.getPendingTodos);

router.route('/:userid/completedtodos')
	.get(userController.getCompletedTodos)
	.delete(userController.deleteCompletedTodos);

router.route('/:userid/delayedtodos')
	.get(userController.getDelayedTodos);

router.route('/:userid/pendingtodos/share')
	.post(function(req, res, next) {
		res.json('todo router pending todos share post');
	});

/* Forward todo specific routes to todo router */
router.use('/:userid/todos', todoRouter);

module.exports = router;
