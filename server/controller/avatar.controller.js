const db = require("../db");

class AvatarController {
  async changeAvatar(req, res) {
    const { id } = req.body;
    console.log(req.body);
    const file = req.file.originalname;
    const user = await db.query(`UPDATE users SET img = $1 where id = $2 RETURNING *`, [file, id]);
    console.log(user)
    res.json(user.rows[0].img);
  }
}

module.exports = new AvatarController();
