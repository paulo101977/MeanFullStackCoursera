var express = require('express');
var router = express.Router();
var isloged = require('../logged'); //middleware to verify if user is logged
var Video = require('../schemaconfig').Video;

//get all
router.get('/', function(req, res , next) {
    Video.find({}, function(err, videos) {
        if (!err){ 
            res.json(videos);
        } 
        else {next(err)}
    });
});

//get specific video
router.get('/:id', function(req, res , next) {
    var id = req.params.id;
    
    Video.find({_id:id}, function(err, videos) {
        if (!err){ 
            res.json(videos);
        } 
        else {next(err)}
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