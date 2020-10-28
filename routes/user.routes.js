const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline)

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get('/logout', authController.logout);

// user DB
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

const upload = multer();
router.post('/upload', upload.single('file'), async (req, res, next) => {
  const {file, body: {name}} = req;
  console.log(req.file)
  // if (file.mimetype != "image/jpeg") next(new Error("invalid file type"));
  
  const fileName = name + '.jpg';

  await pipeline(
    file.stream, 
    fs.createWriteStream(`${__dirname}/../client-react/public/uploads/${fileName}`))

  res.send('Fileuploaded as ' + fileName);
})

module.exports = router;
