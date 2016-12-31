//start variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session') ;
var RedisStore = require('connect-redis')(session);
var MongoStore = require('connect-mongo')(session);
var MongooseConfig = require('./server/schemaconfig');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');


//connect to videos db
MongooseConfig.connect();

//the passport config
app.use(session({  
  store: new MongoStore({ mongooseConnection: MongooseConfig.connection }),
  secret: 'test',
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

//routes
//login
app.use('/login',require('./server/routes/login.js'))

//video
app.use('/api_videos',require('./server/routes/videos.js'))


//listen to port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!');
});