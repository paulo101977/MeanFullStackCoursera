var LocalStrategy = require('passport-local').Strategy;

var User = require('../schemaconfig').User;

module.exports = function(passport) {
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log(id)
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
        
                //username: String,
                //email:  String,
                //password: String,
        
                process.nextTick(function(){
                    console.log(req.body)
        
                    if(!req.body.username){
                        return done('username error');
                    }

                    if(!req.body.email){
                        return done('email error');
                    }

                    if(!req.body.password){
                        return done('password error');
                    }

                    User.findOne({ "email": req.body.username } , function(err,user){
                        if(err){
                            console.log("err");
                            return done(err);
                        }

                        if(user){
                            return done('Error: User existent');
                        }

                        var newUser = new User();
                        newUser.username = req.body.username;
                        newUser.email = req.body.email;
                        newUser.password = newUser.generateHash(req.body.password);//save hash with the password

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                return done(err, null);

                            return done(null, newUser);
                        });
                    })

                    console.log(req.body)
                    //done(err , null);


                    //return done(null, true ,true);
                    
                })
        

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
        
                User.findOne({ "email": email, /*"password": password*/ } , function(err,user){
                    if(err){
                        console.log("not authenticate");
                        return done(err, null);
                    }
                    
                    if(!user){
                        console.log("user not found");
                        return done('error' , null);
                    }
                    
                    //test the hash
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))
                        
                    console.log('sucess authenticate!');
                    return done(null , user);
                })
                

                //return done(null, true ,true);

            }
        )
    );
    
    
}
