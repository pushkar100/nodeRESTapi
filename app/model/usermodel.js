var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Define salt work factor:
const SALT_WORK_FACTOR = 12; // 10 is default

var UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	gender: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		default: 18
	},
	country: String
});

/* Salt and hash passwords before saving: */
UserSchema.pre('save', function(next) {
	var user = this;

	// Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// Override the cleartext password with the hashed one
            user.password = hash;
            next();
		});
	});
});

/* Compare passwords: */
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatched) {
	    if(err) return cb(err);
	    cb(null, isMatched);
	});
};

module.exports = mongoose.model('user', UserSchema);