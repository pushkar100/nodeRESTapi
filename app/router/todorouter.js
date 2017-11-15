var router = require('express').Router({ mergeParams: true }); // Access to parent router's params
var todoController = require('../controller/todocontroller');

/* Handle todo routes */
router.route('/')
	.get(todoController.getAllTodos)
	.post(todoController.postTodo);

router.route('/:todoid')
	.get(todoController.getTodo)
	.put(todoController.putTodo)
	.delete(todoController.deleteTodo);

module.exports = router;
