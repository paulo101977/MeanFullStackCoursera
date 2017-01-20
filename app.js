//start variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session') ;
var RedisStore = require('connect-redis')(session);
var MongoStore = require('connect-mongo')(session);
var MongooseConfig = require('./server/schemaconfig');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');


//connect to videos db
MongooseConfig.connect();

//listen for uncaught exceptions
process.on('uncaughtException', (err) => {
   console.log('Uncaught Exception: ');
   console.log(err);
});

//the passport config
app.use(session({  
  store: new MongoStore({ mongooseConnection: MongooseConfig.connection }),
  secret: 'narutoreborn',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())  
app.use(passport.session())
app.use(flash()); // use connect-flash for flash messages stored in session

require('./server/Strategy/strategy')(passport);


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//use static folder
app.use(express.static('public'));

// **************** START routes **********************

//isloged
app.use('/isloged',require('./server/routes/isloged.js'))

//logout
app.use('/logout',require('./server/routes/logout.js'))

//signup
app.use('/signup',require('./server/routes/signup.js'))

//login
app.use('/login',require('./server/routes/login.js'))

//video
app.use('/api_videos',require('./server/routes/videos.js'))

//error messages
app.use('/error',require('./server/routes/error.js'))


//sucess messages
app.use('/sucess',require('./server/routes/sucess.js'))

// **************** END routes **********************

//listen to port 8080
app.listen(process.env.PORT, function () {
	var port = server.address().port;
    console.log("App now running on port", port);
});