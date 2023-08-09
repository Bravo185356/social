const db = require("../db");

class PostRepository {
  async createPost(content, userId) {
    const newPost = await db.query(`INSERT INTO posts (content, user_id) values ($1, $2) RETURNING *`, [content, userId]);
    return newPost[0];
  }
  async deletePost(id) {
    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
  }
  async getUserPosts(id) {
    const posts = await db.query(`SELECT * FROM posts where user_id = $1`, [id]);
    return posts;
  }
}

module.exports = new PostRepository();
