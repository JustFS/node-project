const UserModel = require('../models/userModel');

module.exports.userInfo = (req, res) => {
  UserModel.findOne((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
}