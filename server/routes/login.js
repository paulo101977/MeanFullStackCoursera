var express = require('express');
var router = express.Router();
var passport = require('passport');



router.post('/', passport.authenticate('local-login', { 
        successRedirect : '/sucess/login', // redirect to the secure profile section
        failureRedirect : '/error/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages 
    }) 
)

module.exports = router;