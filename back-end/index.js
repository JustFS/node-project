const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post')
const cors = require('cors');

const app = express();

// erreur à rajouter plus tard
mongoose.set('useFindAndModify', false);

// middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({origin:'https://cdpn.io'}))

// db connection
const dbURI = 'mongodb+srv://juaz:4wVmjBtZyjZRhQYf@cluster0.pxxno.mongodb.net/test';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(5500), () => console.log('listen server'))
  .catch((err) => console.log(err));

// routes
app.use('/post', postRoutes);