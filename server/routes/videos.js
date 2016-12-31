var express = require('express');
var router = express.Router();


var Video = require('../mongoose').Video;

//get all
router.get('/', function(req, res , next) {
    Video.find({}, function(err, videos) {
        if (!err){ 
            res.json(videos);
        } 
        else {next(err)}
    });
});

//get specific
router.get('/:id', function(req, res , next) {
    var id = req.params.id;
    
    Video.find({_id:id}, function(err, videos) {
        if (!err){ 
            res.json(videos);
        } 
        else {next(err)}
    });
});


router.post('/', function(req, res , next) {
    if (!req.body) return res.sendStatus(400)
    
    var video = new Video(req.body);
    
    video.save(function(err,doc){
        if(err) next(err);
        
        res.json(doc);
    });
});


module.exports = router;