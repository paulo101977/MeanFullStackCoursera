var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'User' },
    description:   String,
    date: { type: Date, default: Date.now },
    _video: { type: Schema.ObjectId, ref: 'Video' }
});

module.exports = CommentSchema;