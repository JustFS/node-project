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

// middleware
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
}
app.use(cors(corsOptions));

// routes
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes); 

app.use((req, res) => {
  res.status(404).json({
      success: false,
      msg: "Page not found"
  })
})

app.listen(process.env.PORT, () => {console.log(`Listening on port ${process.env.PORT}`);
});