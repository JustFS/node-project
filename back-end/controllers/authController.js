const UserModel = require('../models/userModel');
const validation = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 3 * 24 * 60 * 60 * 1000;


module.exports.registerUser = async (req, res) => {
  // validate data before create new user
  const { error } = validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // checking if the user already exists
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = jwt.sign({id:user._id}, process.env.TOKEN_SECRET, {expiresIn: maxAge});
    // bien mettre httpOnly pour la sécurité
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
    // res.cookie('uid', { user: user._id }, { httpOnly: false, maxAge: maxAge });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    console.log(err);
    res.status(400).json();
  }
}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
