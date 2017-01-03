var express = require('express');
var router = express.Router();



router.get('/signup', function(req,res,next){
    res.json({sucess:'signup'})
} )

router.get('/login', function(req,res,next){
    res.json({sucess:'login'})
} )

module.exports = router;