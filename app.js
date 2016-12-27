//start variables
var express = require('express');
var app = express();

//use static folder
app.use(express.static('app'));





//listen to port 8080
app.listen(8080, function () {
  console.log('App listening on port 8080!');
});