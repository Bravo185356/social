const db = require("../db");

class UserController {
  async getAllUsers(req, res) {
    const userList = await db.query(`SELECT id, name, surname, city, img FROM users`);
    res.json(userList.rows);
  }
  async getUserInfo(req, res) {
    const {id, myId} = req.query;
    const userInfo = await db.query(
      `SELECT *, (SELECT status FROM friends where whose = $1 AND id = $2 AND whose IS NOT NULL)
      FROM users where id = $2`,
      [myId, id]
    );
    res.json(userInfo.rows[0]);
  }
}

module.exports = new UserController();
