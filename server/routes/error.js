var express = require('express');
var router = express.Router();



router.get('/signup', function(req,res,next){
    res.json({error:'signup'})
} )

router.get('/login', function(req,res,next){
    res.json({error:'login'})
} )

module.exports = router;