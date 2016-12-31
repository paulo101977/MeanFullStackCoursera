var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use('local-login',
        new LocalStrategy(
            function(username, password, done) { // callback with email and password from our form

                console.log('username and password:')
                console.log(username);
                console.log(password);
                
                //return done(null, false, req.flash('signupMessage', 'That email is already taken.'));


                return done(null, {test:'test'});

            }
        )
    );
}
