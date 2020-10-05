const router = require('express').Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);


module.exports = router;
