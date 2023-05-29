const Router = require("express");
const router = new Router();
const PostController = require("../controller/post.controller");

router.delete("/delete-post", PostController.deletePost);
router.post("/create-post", PostController.createPost);
router.get("/get-posts", PostController.getUserPosts);

module.exports = router;
