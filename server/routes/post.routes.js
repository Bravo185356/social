const Router = require("express");
const router = new Router();
const PostController = require("../controller/post.controller");

router.delete("/post/delete", PostController.deletePost);
router.post("/post/create", PostController.createPost);
router.get("/posts/:userId", PostController.getUserPosts);

module.exports = router;
