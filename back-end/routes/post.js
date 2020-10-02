const router = require('express').Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.get('/test', verifyToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;
