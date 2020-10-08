const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get('/logout', authController.logout);
router.get('/:id', userController.userInfo);

module.exports = router;
