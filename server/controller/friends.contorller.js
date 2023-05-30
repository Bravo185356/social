const db = require("../db");

class FriendsController {
  async addFriend(req, res) {
    const { myId, id } = req.body;
    console.log(req.body)
    await db.query(`INSERT INTO friends (whose, id, status) values ($1, $2, 0)`, [myId, id])
  }
  async getFriendList(req, res) {
    const id = req.query.id;
    const friendList = await db.query(
      `SELECT a.name, a.surname, a.img, a.id 
      FROM users AS a, friends AS b
      where b.whose = $1 AND a.id = b.id AND b.status = 1`,
      [id]
    );
    res.json(friendList);
  }
}

module.exports = new FriendsController();
