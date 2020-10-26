const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  }).select('-password');
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({ message: err });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports.follow = async (req, res) => {
  if (!req.body.idTo || !req.params.id) {
    return res.status(404).json({ message: "ID not found" });
  }

  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idTo } },
      { new: true, upsert: true },
      (err, doc) => {
        if (!err) res.status(201).json(doc);
        else return res.status(400).json(err);
      }
    );
    // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idTo,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, doc) => {
        // if (!err) return res.status(201).json(doc);
        if (err) return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.unfollow = async (req, res) => {
  if (!req.body.idTo || !req.params.id) {
    return res.status(404).json({ message: "No ID found" });
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idTo } },
      { new: true, upsert: true },
      (err, doc) => {
        if (!err) res.status(200).json(doc);
        else res.status(400).json(err);
      }
    );
    await UserModel.findByIdAndUpdate(
      req.body.idTo,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
      }
    );
  } catch (e) {
    return res.status(500).json(err);
  }
};

module.exports.uploadPicture = async (req, res, next) => {

};


