var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	status: {
		type: Boolean, // true = completed, false = pending
		default: false
	},
	priority: {
		type: Number,
		default: 2 // Priorities: 1 (highest), 2 (medium) & 3 (low)
	},
	time: {
		type: Date,
		default: Date.now() + (1000 * 60 * 60 * 24) // Default time for completing task = 1 day.
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	}
});
module.exports = mongoose.model('todo', TodoSchema);