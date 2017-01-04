var express = require('express');
var router = express.Router();
var isLogged = require('../logged'); //middleware to verify if user is logged


router.get('/' , isLogged , function(req, res , next){
    res.json([{message: true , user: req.user}])
}); //check if user is logged

module.exports = router;