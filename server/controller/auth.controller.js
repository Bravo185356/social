const db = require("../db");

class AuthController {
  async createUser(req, res) {
    const { name, surname, login, password, city } = req.body;
    console.log(req.body);
    const newUser = await db.query(
      `INSERT INTO users (name, surname, login, password, city, posts) values ($1, $2, $3, $4, $5) RETURNING *`,
      [name, surname, login, password, city]
    );
    res.json(newUser);
  }
  async login(req, res) {
    const { id = null, login, password } = req.body;
    let user;
    console.log(req.body);
    if (req.body.id) {
      user = await db.query(`SELECT * FROM users where id = $1`, [id]);
    } else {
      user = await db.query(`SELECT * FROM users where login = $1 AND password = $2`, [login, password]);
    }
    if (user.rows.length === 0) {
      res.json("Неверный логин или пароль");
    } else {
      res.json(user);
    }
  }
}

module.exports = new AuthController()