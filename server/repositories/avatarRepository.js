const db = require("../db");

class AvatarRepository {
  async addAvatarToRecentList() {
    await db.query(
      `INSERT INTO recent_avatars (img, user_id, upload_date) values ((SELECT img FROM users WHERE id = $1), $1, $2)`,
      [id, date]
    );
  }
  async updateAvatar(file, id) {
    const newImage = await db.query(`UPDATE users SET img = $1 where id = $2 RETURNING img`, [file, id]);
    return newImage[0];
  }
  async getRecentList(id) {
    const recentAvatarsList = await db.query(`SELECT img FROM recent_avatars WHERE user_id = $1 ORDER BY upload_date DESC LIMIT 3`, [
      id,
    ]);
    return recentAvatarsList
  }
}

module.exports = new AvatarRepository();
