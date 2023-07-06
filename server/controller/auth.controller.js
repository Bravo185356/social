const db = require("../db");

class AuthController {
  async createUser(req, res) {
    const { name, surname, login, password, city } = req.body;
    await db.query(`INSERT INTO users (name, surname, login, password, city, posts) values ($1, $2, $3, $4, $5)`, 
    [name, surname, login, password, city,]);
  }
  async login(req, res) {
    const { id = null, login, password } = req.body;
    let user;
    if (req.body.id) {
      user = await db.query(`SELECT * FROM users where id = $1`, [id]);
    } else {
      user = await db.query(`SELECT * FROM users where login = $1 AND password = $2`, [login, password]);
    }
    if (user.rows.length === 0) {
      res.json("Неверный логин или пароль");
    } else {
      await res.json(user.rows[0]);
    }
  }
}

module.exports = new AuthController();
