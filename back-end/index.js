const express = require('express');
const app = express();
require('./models/dbConfig');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts')
const cors = require('cors');

// erreur à rajouter plus tard
mongoose.set('useFindAndModify', false);

// middleware
app.use(bodyParser.json());
app.use('/posts', postsRoutes);
app.use(cors());
// app.use(cors({origin:'https://cdpn.io'}))
app.listen(5500,() => console.log('Server started : 5500'))