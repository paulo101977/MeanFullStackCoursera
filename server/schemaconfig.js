var mongoose = require('mongoose');


//use models:

//video schema
var VideoSchema = require('./model/video.js')
var Video = mongoose.model('Video', VideoSchema);

//user schema
var UserSchema = require('./model/user.js')
var User = mongoose.model('User', UserSchema);

//exports configs
module.exports = {
    Video: Video,
    User: User,
    mongoose: mongoose,
    connect: function(){
        mongoose.connect('mongodb://localhost/videos');
    },
    connection: mongoose.connection
}