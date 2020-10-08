const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: [true, 'pseudo required'],
    minlength: [3, 'minimum length 6'],
    maxlength: [55, 'maxium length exedeed'],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Merci de renseigner un email valide'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minlength: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;