const db = require("../db");

class UserController {
  async getAllUsers(req, res) {
    const userList = await db.query(`SELECT id, name, surname, city, img FROM users`);
    res.json(userList.rows);
  }
  async getUsersWithFilter(req, res) {
    const { name, surname = null } = req.query;
    let userList;
    if (name && surname) {
      userList = await db.query(`SELECT id, name, surname, city, img FROM users where name=$1 AND surname=$2`, [name, surname]);
    } else if(name) {
      userList = await db.query(`SELECT id, name, surname, city, img FROM users where name=$1 OR surname=$1`, [name]);
    } else {
      userList = await db.query(`SELECT id, name, surname, city, img FROM users`);
    }
    res.json(userList.rows)
  }
  async getUserInfo(req, res) {
    const { id, myId } = req.query;
    const userInfo = await db.query(
      `SELECT name, surname, last_visit, id, city, img, 
      (SELECT status FROM friends where whose = $1 AND id = $2 AND whose IS NOT NULL)
      FROM users where id = $2`,
      [myId, id]
    );
    res.json(userInfo.rows[0]);
  }
  async setLastVisitTime(req) {
    const { id } = req.body
    const date = new Date().toISOString()
    await db.query(`UPDATE users SET last_visit = $1 WHERE id = $2`, [date, id]);
  }
}

module.exports = new UserController();
