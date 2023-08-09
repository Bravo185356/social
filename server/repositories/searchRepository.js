const db = require("../db");

class SearchRepository {
  async getAllUsers(req, res) {
    const userList = await db.query(`SELECT id, name, surname, city, img FROM users`);
    return userList;
  }
  async getUsersWithFilter(name, surname) {
    const userList = await db.query(
      `SELECT id, name, surname, city, img FROM users 
        WHERE (name = $1 AND surname = $2) 
        OR (name LIKE CONCAT($1, '%') OR surname LIKE CONCAT($1, '%'))`,
      [name, surname]
    );
    return userList;
  }
  async getUserInfo(id, myId) {
    const userInfo = await db.query(
      `SELECT name, surname, last_visit, id, city, img, 
          (SELECT status FROM friends where whose = $1 AND id = $2 AND whose IS NOT NULL)
          FROM users where id = $2`,
      [myId, id]
    );
    return userInfo[0];
  }
}

module.exports = new SearchRepository();
