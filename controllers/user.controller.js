const UserModel = require("../models/user.model");

module.exports.userInfo = (req, res) => {
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};