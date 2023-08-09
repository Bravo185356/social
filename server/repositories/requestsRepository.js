const db = require("../db");

class RequestsRepository {
  async getFriendRequests(id) {
    const user = await db.query(
      `SELECT a.name, a.surname, a.img, a.id 
        FROM users AS a, friends AS b
        where b.id = $1 AND a.id = b.whose AND b.status = 0`,
      [id]
    );
    return user;
  }
  async acceptRequest( myId, id) {
    await db.query(`INSERT INTO friends (whose, id, status) values ($1, $2, 1)`, [myId, id]);
    await db.query(`UPDATE friends SET status = 1 where whose = $1 AND id = $2`, [id, myId]);
  }
  async rejectRequest(id) {
    await db.query(`DELETE FROM friends where whose = $1`, [id]);
  }
}

module.exports = new RequestsRepository();
