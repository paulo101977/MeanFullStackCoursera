var mongoose = require('mongoose');


//use models:

//video schema
var VideoSchema = require('./model/video.js')
var Video = mongoose.model('Video', VideoSchema);

//user schema
var UserSchema = require('./model/user.js')
var User = mongoose.model('User', UserSchema);

//Comment schema
var CommentSchema = require('./model/comment.js')
var Comment = mongoose.model('Comment', CommentSchema);

//exports mongoose configs
module.exports = {
    Video: Video,
    User: User,
    Comment: Comment,
    mongoose: mongoose,
    connect: function(){
        mongoose.connect('mongodb://localhost/videos');
    },
    connection: mongoose.connection
}