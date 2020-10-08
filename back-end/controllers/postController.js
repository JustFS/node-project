const PostModel = require("../models/postModel");
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
}

module.exports.createPost = (req, res) => {
  const newRecord = new PostModel({
    author: req.body.author,
    message: req.body.message,
    userId: req.body.userId
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error creating new data : " + err)
  });
}

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    // 400 bad request, syntaxe invalide
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    author: req.body.author,
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
}

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
}