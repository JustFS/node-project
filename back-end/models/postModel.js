const mongoose = require("mongoose");

const quotesSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model('quotes', quotesSchema)

module.exports = { PostModel };
