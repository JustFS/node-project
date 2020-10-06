const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000'}));

// db connection
const dbURI = 'mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.pxxno.mongodb.net/node-project-0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((res) => app.listen(5500, () => console.log('listen server:5500')))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/api/user/jwtid', requireAuth);
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);