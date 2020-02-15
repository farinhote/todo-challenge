const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const projects = require('./routes/projects');
const mongoose = require('./config/database');
const bodyParser = require('body-parser');
var cors = require('cors')
var jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', function (req, res) {
  res.json({ "Server": "Is(hopefully) running smoothly" });
});

app.use('/users', users);

app.use('/projects', validateUser, projects);

function validateUser(req, res, next) {
  console.log(req.headers);
  jwt.verify(req.headers.authorization, req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else  {
      // add user id to request

      req.body.userId = decoded.id;
      next();
    }
  });

}

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, function () { console.log('Node server listening on port 3000'); });