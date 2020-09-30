const mongoose = require("mongoose");

const PostsModel = mongoose.model(
  // nom de la db
  "node-project",
  {
    author: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  // nom de la table
  "posts"
);

module.exports = { PostsModel };
