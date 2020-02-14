const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://todo:test@cluster0-zxfky.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;