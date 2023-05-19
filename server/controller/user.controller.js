const db = require("../db");

class UserController {
  async getAllUsers(req, res) {
    const userList = await db.query(`SELECT id, name, surname, city, img FROM users`);
    res.json(userList);
  }
  async getUserInfo(req, res) {
    const id = req.query.id;
    const userInfo = await db.query(`SELECT * FROM users where id = $1`, [id]);
    res.json(userInfo.rows[0]);
  }
}

module.exports = new UserController();
