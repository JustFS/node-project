const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');
require('dotenv').config({path: './config/.env'});
require('./config/db.js');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// const path = require("path");
// app.use(express.static(path.join(__dirname, "./public/")));

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes); 

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});