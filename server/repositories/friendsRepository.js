const db = require("../db");

class FriendsRepository {
  async addFriend(myId, id) {
    await db.query(`INSERT INTO friends (whose, id, status) values ($1, $2, 0)`, [myId, id]);
  }
  async getFriendList(id) {
    const friendList = await db.query(
      `SELECT name, surname, img, users.id, online_status.status FROM users 
        JOIN friends ON users.id = friends.id 
        JOIN online_status ON users.id = online_status.user_id 
        WHERE friends.whose = $1 AND friends.status = 1`,
      [id]
    );
    return friendList;
  }
  async getFriendsWithFilter(id, name, surname) {
    const filteredList = await db.query(
      `SELECT name, surname, img, users.id FROM friends JOIN users ON users.id = friends.id 
        WHERE ((name LIKE CONCAT($2, '%') OR surname LIKE CONCAT($2, '%')) OR (name = $2 AND surname = $3))
        AND friends.whose = $1 AND friends.status = 1`,
      [id, name, surname]
    );
    return filteredList;
  }
}

module.exports = new FriendsRepository();
