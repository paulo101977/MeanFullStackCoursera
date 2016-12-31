//start variables
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//use static folder
app.use(express.static('public'));

//routes
app.use('/api_videos',require('./server/routes/videos.js'))


//listen to port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!');
});