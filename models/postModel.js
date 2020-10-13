const mongoose = require("mongoose");

const quotesSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Veuillez renseigner un nom"],
    unique: true
  },
  message: {
    type: String,
    required: [true, "Merci d'entrer un message"]
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  }
});

module.exports = mongoose.model('quotes', quotesSchema)


