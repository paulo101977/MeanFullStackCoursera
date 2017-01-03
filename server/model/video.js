var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    title:  String,
    url: String,
    _author : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description:   String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    date: { type: Date, default: Date.now }
});

module.exports = VideoSchema;

