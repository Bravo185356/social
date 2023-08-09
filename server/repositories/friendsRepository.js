const db = require("../db");

class FriendsRepository {
  async addFriend(myId, id) {
    await db.query(`INSERT INTO friends (whose, id, status) values ($1, $2, 0)`, [myId, id]);
  }
  async getFriendList(id) {
    const friendList = await db.any(
      `SELECT a.name, a.surname, a.img, a.id 
          FROM users AS a, friends AS b
          WHERE b.whose = $1 AND a.id = b.id AND b.status = 1`,
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
