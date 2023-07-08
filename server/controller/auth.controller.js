const db = require("../db");
const bcrypt = require("bcrypt");
const defaultImg = require("../constants");

class AuthController {
  async createUser(req, res) {
    const { name, surname, login, password, city } = req.body;
    const isUserExisting = await db.query(`SELECT id FROM users where login = $1`, [login]);
    if (isUserExisting) {
      return res.json("Такой пользователь уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const date = new Date().toISOString();
    await db.query(
      `INSERT INTO users (name, surname, login, password, city, registration_date, last_visit, img) values ($1, $2, $3, $4, $5, $6, $6, $7)`,
      [name, surname, login, hashPassword, city, date, defaultImg]
    );
    res.json("Пользователь успешно зарегистрирован");
  }
  async loginOnPageLoad(req, res) {
    const { id } = req.body;
    const user = await db.query(
      `SELECT id, name, surname, city, login, img, last_visit, registration_date FROM users where id = $1`,
      [id]
    );
    if (user) {
      res.json(user.rows[0]);
    } else {
      res.json("Не удалось авторизоваться");
    }
  }
  async loginByForm(req, res) {
    const { login, password } = req.body;
    const hashPassword = await db.query(`SELECT password FROM users where login = $1`, [login]);
    const match = await bcrypt.compare(password, hashPassword.rows[0].password);
    if (match) {
      const user = await db.query(
        `SELECT id, name, surname, city, login, img, last_visit, registration_date FROM users where login = $1`,
        [login]
      );
      res.json(user.rows[0]);
    } else {
      res.json("Неверный логин или пароль");
    }
  }
}

module.exports = new AuthController();
