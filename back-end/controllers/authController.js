const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { pseudo: '', email: '', password: '' };

  if (err.message.includes(`pseudo`))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes('email'))
    errors.email = 'Email incorrect';

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire plus de 6 caractères';

  if (err.code === 11000)
    errors.email = 'Cet email est déjà enregistré';

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await UserModel.create({ pseudo, email, password });
    // const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(200).send({ errors });
  }
 
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(200).json({ errors });
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}