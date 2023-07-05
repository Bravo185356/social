const db = require("../db");

class AvatarController {
  async uploadAvatar(req, res) {
    const { id } = req.body;
    const file = req.file.filename;
    const date = new Date().toISOString();
    await db.query(
      `INSERT INTO recent_avatars (img, user_id, upload_date) values ((SELECT  img FROM users WHERE id = $1), $1, $2)`,
      [id, date]
    );
    const newImage = await db.query(`UPDATE users SET img = $1 where id = $2 RETURNING img`, [file, id]);
    const newRecentList = await db.query(`SELECT img FROM recent_avatars WHERE user_id = $1 ORDER BY upload_date DESC LIMIT 3`, [
      id,
    ]);
    res.json({ img: newImage.rows[0].img, recent: newRecentList.rows });
  }
  async getRecentAvatars(req, res) {
    const { id } = req.query;
    const images = await db.query(`SELECT img FROM recent_avatars WHERE user_id = $1 ORDER BY upload_date DESC LIMIT 3`, [id]);
    res.json(images.rows);
  }
  async selectFromRecent(req, res) {
    const { id, img } = req.body;
    const image = await db.query(`UPDATE users SET img = $1 WHERE id = $2`, [img, id]);
    res.json(image.rows[0]);
  }
}

module.exports = new AvatarController();
