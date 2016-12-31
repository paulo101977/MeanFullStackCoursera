var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
    title:  String,
    url: String,
    //authorId: ObjectId,
    description:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }
});

module.exports = VideoSchema;

