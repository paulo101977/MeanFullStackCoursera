var mongoose = require('mongoose');


//use models:

//video schema
var VideoSchema = require('./model/video.js')
var Video = mongoose.model('Video', VideoSchema);


module.exports = {
    Video: Video,
    mongoose: mongoose,
    connect: function(){
        mongoose.connect('mongodb://localhost/videos');
    },
    connection: mongoose.connection,
}