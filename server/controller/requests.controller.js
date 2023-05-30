const db = require("../db");

class RequestController {
  async getRequests(req, res) {
    const id = req.query.id;

    const user = await db.query(
      `SELECT a.name, a.surname, a.img, a.id 
          FROM users AS a, friends AS b
          where b.id = $1 AND a.id = b.whose AND b.status = 0`,
      [id]
    );
    res.json(user);
  }
  async acceptRequest(req, res) {
    const { myId, id } = req.body;

    await db.query(`INSERT INTO friends (whose, id, status) values ($1, $2, 1)`, [myId, id]);
    await db.query(`UPDATE friends SET status = 1 where whose = $1`, [id]);
  }
  async rejectRequest(req, res) {
    const { id } = req.body;

    await db.query(`DELETE FROM friends where whose = $1`, [id]);
  }
}

module.exports = new RequestController();
