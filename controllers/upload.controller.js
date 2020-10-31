const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const UserModel = require("../models/user.model");

module.exports.uploadProfil = async (req, res) => {
  console.log('req.file:', req.file.detectedMimeType)
  if (
    req.file.detectedMimeType != "image/jpg" &&
    req.file.detectedMimeType != "image/png" &&
    req.file.detectedMimeType != "image/jpeg"
  )
    return console.log("invalid file type");

  if (req.file.size > 500000) return console.log("too big");

  const fileName = req.body.name + '.jpg';

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/profil/${fileName}`
    )
  );
  // update file name
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.body.userId },
      { $set: {picture: "./uploads/profil/" + fileName}},
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