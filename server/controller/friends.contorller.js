const db = require("../db");

class FriendsController {
  async addFriend(req, res) {
    const { myId, id } = req.body;
    await db.query(`INSERT INTO friends (whose, id, status) values ($1, $2, 0)`, [myId, id]);
  }
  async getFriendList(req, res) {
    const id = req.query.id;
    const friendList = await db.query(
      `SELECT a.name, a.surname, a.img, a.id 
      FROM users AS a, friends AS b
      WHERE b.whose = $1 AND a.id = b.id AND b.status = 1`,
      [id]
    );
    res.json(friendList.rows);
  }
  async getFriendsWithFilter(req, res) {
    const { id, name, surname = null } = req.query;
    let friendList;
    if (name && surname) {
      friendList = await db.query(
        `SELECT a.name, a.surname, a.img, a.id 
        FROM users AS a, friends AS b
        WHERE b.whose = $1 AND a.id = b.id AND b.status = 1 AND a.name = $2 AND a.surname = $3
        `,
        [id, name, surname]
      );
    } else {
      friendList = await db.query(
        `SELECT a.name, a.surname, a.img, a.id 
        FROM users AS a, friends AS b
        WHERE b.whose = $1 AND a.id = b.id AND b.status = 1 AND (a.name = $2 OR a.surname = $2)
        `,
        [id, name]
      );
    }
    res.json(friendList.rows);
  }
}

module.exports = new FriendsController();
