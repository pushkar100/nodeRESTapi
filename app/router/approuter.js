var router = require('express').Router(); // This is the parent router (no need to merge params)
var userRouter = require('./userrouter');
var authRouter = require('./authrouter');

/* Handle basic routes */
router.route('/')
	.get(function(req, res, next){
		res.status(404).send('Todo API has no route for root(/) request path - start with \'/auth\' or \'/users\'');
	});

/* Forward authentication specific routes to auth router */
router.use('/auth', authRouter);

/* Forward user specific routes to user router */
router.use('/users', userRouter);

module.exports = router;