const db = require("../db");

class UserController {
  async setLastVisitTime(req) {
    const { id } = req.body;
    const date = new Date().toISOString();
    await db.query(`UPDATE users SET last_visit = $1 WHERE id = $2`, [date, id]);
  }
  async deleteUser(req) {
    const { id } = req.body
    await db.query(`DELETE FROM users WHERE id = $1`, [id])
  }
}

module.exports = new UserController();
