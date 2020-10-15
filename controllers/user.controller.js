const UserModel = require("../models/user.model");
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

module.exports.userInfo = (req, res) => {
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.userPicture = (req, res) => {
    upload.single("user-picture" /* name attribute of <file> element in your form */),
    (req, res, next) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "./uploads/image.png");
  
      console.log(tempPath);
      console.log(targetPath);
    }
  res.sendFile(path.join(__dirname, "./uploads/image.png"))
}