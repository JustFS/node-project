const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.pxxno.mongodb.net/node-project-0', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false,
});