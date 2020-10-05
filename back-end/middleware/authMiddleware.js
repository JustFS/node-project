const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, docs) => {
      if (err) {
        console.log(err.message);
        res.send(null);
      } else {
        let id = docs.id;
        console.log(id);
        console.log(res.locals.user._id);
        res.send({id})
        next();
      }
    });
  } else {
    // redirect login ?
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };