var config = {
	dev: 'development',
	prod: 'production',
	test: 'testing',
	port: process.env.PORT || 3000,
	jwt: {
		secretKey: process.env.JWT_SECRET_KEY || 'devjwtsecretkey',
		expiresIn: 60 * 60 * 24 * 10 // 10 days in seconds
	}
};

// Get and Set the current environment:
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

if(config.env === config.dev) {
	config.db = { url: 'mongodb://localhost/todoapp' };
} else if(config.env === config.prod) {
	config.db = { url: process.env.DB };
} else {
	config.db = { url: 'mongodb://localhost/todoapp-test' };
}

module.exports = config;