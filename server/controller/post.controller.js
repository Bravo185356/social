const PostRepository = require('../repositories/postRepository')

class PostController {
  async createPost(req, res) {
    const { content, userId } = req.body;
    const newPost = await PostRepository.createPost(content, userId);
    res.json(newPost);
  }
  async deletePost(req, res) {
    const { id } = req.body;
    await PostRepository.deletePost(id);
  }
  async getUserPosts(req, res) {
    const { userId } = req.params;
    const posts = await PostRepository.getUserPosts(userId);
    res.json(posts);
  }
}

module.exports = new PostController();
