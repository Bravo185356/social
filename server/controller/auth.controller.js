const db = require("../db");
const bcrypt = require("bcrypt");
const defaultImg = require("../constants");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')


class AuthController {
  async createUser(req, res) {
    const { name, surname, login, password, city } = req.body;
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
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
    const { token } = req.body;
    const result = jwt.verify(token, 'secret', function(error, decoded) {
      if(error) {
        res.json({ error })
      } else {
        return decoded
      }
    })
    if(result) {
      const user = await db.query(
        `SELECT id, name, surname, city, login, img, last_visit, registration_date FROM users where login = $1`,
        [result.login]
      );
      const token = jwt.sign({ login: result.login, password: result.password }, 'secret', { expiresIn: '10s' });
      res.json({ user: user.rows[0], newToken: token });
    }
  }
  async loginByForm(req, res) {
    const { login, password } = req.body;
    const errors = validationResult(req).formatWith((error) => error.msg).array();
    if(errors.length) {
      const formatErrors = Array.from(new Set(errors))
      return res.json({ error: formatErrors });
    }
    const user = await db.query(
      `SELECT id, name, surname, city, login, img, last_visit, registration_date FROM users where login = $1`,
      [login]
    );
    const token = jwt.sign({ login, password }, 'secret', { expiresIn: '24h' });
    res.json({ user: user.rows[0], token });
  }
  async checkPassword(login, password) {
    const hashPassword = await db.query(`SELECT password FROM users where login = $1`, [login]);
    if(!hashPassword.rows[0]) {
      return false
    }
    const match = await bcrypt.compare(password, hashPassword.rows[0].password);
    return match
  }
  async checkUserExisting(login) {
    const isUserExisting = await db.query(`SELECT id FROM users where login = $1`, [login]);
    return isUserExisting.rows[0] ? false : true
  }
}

module.exports = new AuthController();
