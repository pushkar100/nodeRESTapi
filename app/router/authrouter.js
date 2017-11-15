var router = require('express').Router({ mergeParams: true }); // Access to parent router's params
var authController = require('../controller/authcontroller');

/* Handle auth routes */
router.route('/signin')
	.post(authController.userSignIn);

module.exports = router;
