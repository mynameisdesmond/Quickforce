var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = mongoose.Schema({
	name; String,
	address_from: String,
	address_to: String,
	time: String
})

var Request = mongoose.model('Request', requestSchema);

exports.Request = Request;