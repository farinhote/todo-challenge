const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
 res.json({"tutorial" : "Build REST API with node.js"});
});

app.listen(3000, function(){ console.log('Node server listening on port 3000');});