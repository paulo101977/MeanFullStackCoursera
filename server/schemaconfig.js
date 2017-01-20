var mongoose = require('mongoose');


//use models:

//video schema
var VideoSchema = require('./model/video.js')
var Video = mongoose.model('VideoTable', VideoSchema);

//user schema
var UserSchema = require('./model/user.js')
var User = mongoose.model('UserTable', UserSchema);

//Comment schema
var CommentSchema = require('./model/comment.js')
var Comment = mongoose.model('CommentTable', CommentSchema);

//database uri
var uri = 'mongodb://paulo101977:3007paulo1977@ds019076.mlab.com:19076/courserameteor';




//exports mongoose configs
module.exports = {
    Video: Video,
    User: User,
    Comment: Comment,
    mongoose: mongoose,
    connect: function(){
        mongoose.connect(uri);
    },
    connection: mongoose.connection
} 