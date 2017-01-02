var LocalStrategy = require('passport-local').Strategy;

var User = require('../schemaconfig').User;

module.exports = function(passport) {
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req , email, password, done) { // callback with email and password from our form
        
                /*var user = User.find({ "email": email, "password": password } , function(err,user){
                    if(err){
                        console.log("not authenticate");
                        return done(err, false);
                    }
                        
                    console.log("authenticate");
                    return done(null , user);
                })*/
        
                console.log(req.body)
                done(err , null);
                

                //return done(null, true ,true);

            }
        )
    );
    
    passport.use('local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req , email, password, done) { // callback with email and password from our form

                console.log('email and password:')
                console.log(email);
                console.log(password);
        
                var user = User.find({ "email": email, "password": password } , function(err,user){
                    if(err){
                        console.log("not authenticate");
                        return done(err, null);
                    }
                    
                    if(!user){
                        console.log("not authenticate");
                        return done('error' , null);
                    }
                    
                    if(user.length <= 0){
                        console.log("not authenticate");
                        return done('error' , null);
                    }
                        
                    console.log("authenticate");
                    return done(null , user);
                })
                

                //return done(null, true ,true);

            }
        )
    );
}
