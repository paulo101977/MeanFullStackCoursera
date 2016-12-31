var express = require('express');
var router = express.Router();
var passport = require('passport');



router.post('/', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log(user);
    console.log(info)
    res.json({res: res.params})
  })(req, res, next);
});

module.exports = router;