const router = require('express').Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get('/logout', authController.logout)


module.exports = router;
