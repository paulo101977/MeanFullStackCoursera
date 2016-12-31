var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:  String,
    password: String,
    date: { type: Date, default: Date.now }
});

module.exports = UserSchema;