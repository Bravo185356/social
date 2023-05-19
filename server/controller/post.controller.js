const db = require("../db");

class PostController {
  async createPost(req, res) {
    const { content, userId } = req.body;
    const newPost = await db.query(`INSERT INTO posts (content, user_id) values ($1, $2) RETURNING *`, [content, userId]);
    res.json(newPost.rows[0]);
  }
  async deletePost(req, res) {
    const { id } = req.body;
    console.log(id);
    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
  }
  async getUserPosts(req, res) {
    const id = req.query.id;
    const posts = await db.query(`SELECT * FROM posts where user_id = $1`, [id]);
    console.log(posts);
    res.json(posts.rows);
  }
}

module.exports = new PostController();
