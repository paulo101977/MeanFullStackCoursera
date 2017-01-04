var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'User' , required: true },
    comment:  { type: String, required: true},
    date: { type: Date, default: Date.now },
    _video: { type: Schema.ObjectId, ref: 'Video' , required: true }
});

module.exports = CommentSchema;