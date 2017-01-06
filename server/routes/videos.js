var express = require('express');
var router = express.Router();
var isloged = require('../logged'); //middleware to verify if user is logged
var Video = require('../schemaconfig').Video;
var Comment = require('../schemaconfig').Comment;

//get all
router.get('/', function(req, res , next) {
    Video.find({}, function(err, videos) {
        if (!err){ 
            res.json(videos);
        } 
        else {next(err)}
    })
    .populate('_author') //populate creator with user info
    .exec(function (err, video) {
        if (err) return handleError(err);
            console.log('The _author is %s', video._author);
            // prints "The creator is Aaron"
        }
    );
});

//get specific video
router.get('/:id', function(req, res , next) {
    var id = req.params.id;
    
    Video.findOne({_id:id}, function(err, video) {
        if (!err){ 
            res.json([video]);
        } 
        else {next(err)}
    })
    .populate('_author') //populate creator with user info
    .exec(function (err, video) {
        if (err) return handleError(err);
            console.log('The _author is %s', video._author);
            // prints "The creator is Aaron"
        }
    );

});

//get comments
router.get('/:idVideo/comments', function(req, res , next) {
    var id = req.params.idVideo;
    
    Comment.find({_video:id}, function(err, comments) {
        if (!err){ 
            res.json(comments);
        } 
        else {next(err)}
    })
    .populate('_creator') //populate creator with user info
    .exec(function (err, comment) {
        if (err) return handleError(err);
            console.log('The creator is %s', comment._creator);
            // prints "The creator is Aaron"
        });
    });

//post comments
router.post('/:idVideo/comments', function(req, res , next) {
    var id = req.params.idVideo;
    if (!req.body) return res.sendStatus(400);
    
    Video.findOne({_id:id}, function(err, video) {
        
        if(err) next(err);
        
        var CommentInstance = new Comment(req.body);
    
        CommentInstance.save(function(err, comment) {
            if(err) next(err);

            res.json(comment);
        });
        
    });
    
    
});


//delete comments
router.delete('/:idVideo/comments/:idComment', function(req, res , next) {
    var idComment = req.params.idComment;
    
    Comment.remove({_id: idComment} , function(err){
        if(err) res.json({message: "Error: " + err})
        
        res.json({message: "sucess"})
    })
    
});


//update comments
router.put('/:idVideo/comments/:idComment', function(req, res , next) {
    var idComment = req.params.idComment;
    
    Comment.findOneAndUpdate({_id:idComment}, req.body, function (err, comment) {
        if(err) res.json({message: "Error: " + err});
        
        res.send({message: "sucess"});
    });
    
});

//save new videos if is logged
router.post('/', isloged ,function(req, res , next) {
    if (!req.body) return res.sendStatus(400)
    
    var VideoInstance = new Video(req.body);
    
    VideoInstance.save(function(err,video){
        if(err) next(err);
        
        res.json(video);
    });
});


module.exports = router;