const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: [true, "Merci d'entrer un message"],
      trim: true,
    },
    posterPic: {
      type: String,
      required: true
    },
    posterPseudo: {
      type: String,
      required: true
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPic: String,
          pseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
