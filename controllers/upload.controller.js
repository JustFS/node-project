const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const UserModel = require("../models/user.model");

module.exports.uploadProfil = async (req, res) => {
  console.log(req.file);
  // if (req.file.reportedFileExtension != ".jpg") throw(new Error("invalid file type"));
  const fileName = req.body.name + '.jpg';

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client-react/public/uploads/profil/${fileName}`
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