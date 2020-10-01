const { Router } = require('express');
const postController = require('../controllers/postController')

const router = Router();

router.get("/", postController.readPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;