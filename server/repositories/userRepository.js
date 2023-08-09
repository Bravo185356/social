const db = require("../db");

class UserRepository {
  async setLastVisitTime(date, id) {
    await db.query(`UPDATE users SET last_visit = $1 WHERE id = $2`, [date, id]);
  }
  async deleteUser(id) {
    await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}

module.exports = new UserRepository();
