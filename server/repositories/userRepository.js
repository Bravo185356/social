const db = require("../db");

class UserRepository {
  async createOnlineStatusRow(login) {
    await db.query(`INSERT INTO online_status (user_id, status) values ((SELECT id FROM users WHERE login = $1), 0)`, [login]);
  }
  async changeOnlineStatus(id, status) {
    const onlineStatus = await db.query(`UPDATE online_status SET status = $2 WHERE user_id = $1 RETURNING status`, [
      id,
      status,
    ]);
    return onlineStatus[0].status;
  }
  async setLastVisitTime(date, id) {
    await db.query(`UPDATE users SET last_visit = $1 WHERE id = $2`, [date, id]);
  }
  async deleteUser(id) {
    await db.query(`DELETE FROM users WHERE id = $1`, [id]);
  }
}

module.exports = new UserRepository();
