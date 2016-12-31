var mongoose = require('mongoose');

//connect to videos db
mongoose.connect('mongodb://localhost/videos');


//use models:

//video schema
var VideoSchema = require('./model/video.js')
var Video = mongoose.model('Video', VideoSchema);


module.exports = {
    Video: Video,
}