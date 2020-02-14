const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://todo:todo@cluster0-zxfky.mongodb.net/test?retryWrites=true&w=majority';
mongoose 
  .connect(mongoDB, { useNewUrlParser: true }) 
  .then(() => console.log("Connected to MongoDB...")) 
  .catch(err => console.error("Could not connect to MongoDB...")); 

mongoose.Promise = global.Promise;

module.exports = mongoose;