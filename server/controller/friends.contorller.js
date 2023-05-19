const db = require("../db");

class FriendsController {
  async addFriend(req, res) {
    const { id, name, surname, img } = req.body.user;
    const whoAdded = req.body.id
    await db.query(`INSERT INTO friends (whose, name, surname, img, id) values ($1, $2, $3, $4, $5)`, [whoAdded, name, surname, img, id]);
    res.json(req.body.user)
  }
  async getFriendList(req, res) {
    const id = req.query.id;
    console.log(id);
    const friendList = await db.query(`SELECT name, surname, img, id FROM friends where whose = $1`, [id]);
    res.json(friendList);
  }
}

module.exports = new FriendsController();
