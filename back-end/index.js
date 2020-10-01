const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post')
const cors = require('cors');
require('dotenv').config();

const app = express();

// erreur à rajouter plus tard
mongoose.set('useFindAndModify', false);

// middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({origin:'https://cdpn.io'}))

// db connection
const dbURI = 'mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.pxxno.mongodb.net/node-project-0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((res) => app.listen(5500, () => console.log('listen server')))
  .catch((err) => console.log(err));

// routes
app.use('/post', postRoutes);