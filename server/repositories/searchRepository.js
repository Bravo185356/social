const db = require("../db");

class SearchRepository {
  async getAllUsers(req, res) {
    const userList = await db.query(
      `SELECT id, name, surname, city, img, status FROM users 
        JOIN online_status ON users.id = online_status.user_id`
    );
    return userList;
  }
  async getUsersWithFilter(filters) {
    const userList = await db.query(
      `SELECT id, name, surname, city, img, status FROM users
        JOIN online_status ON users.id = online_status.user_id
        WHERE ((name = $1 AND surname = $2) 
        OR (name LIKE CONCAT($1, '%') OR surname LIKE CONCAT($1, '%'))) AND city LIKE CONCAT($3, '%')`,
      [filters.name, filters.surname, filters.city]
    );
    return userList;
  }
  async getUserInfo(id, myId) {
    const userInfo = await db.query(
      `SELECT name, surname, last_visit, id, city, img, online_status.status,
        (SELECT status FROM friends WHERE whose = $1 AND id = $2 AND whose IS NOT NULL) as friend_status FROM users 
        JOIN online_status ON users.id = online_status.user_id
        WHERE users.id = $2`,
      [myId, id]
    );
    return userInfo[0];
  }
}

module.exports = new SearchRepository();
