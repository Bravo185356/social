const db = require("../db");

class AuthRepository {
  async createUser(name, surname, login, hashPassword, city, date, defaultImg) {
    const newUser = await db.query(
      `INSERT INTO users (name, surname, login, password, city, registration_date, last_visit, img) values ($1, $2, $3, $4, $5, $6, $6, $7) RETURNING id`,
      [name, surname, login, hashPassword, city, date, defaultImg]
    );
    return newUser[0]
  }
  async getUser(login) {
    const user = await db.query(
      `SELECT id, name, surname, city, login, img, last_visit, registration_date FROM users WHERE login = $1`,
      [login]
    );
    return user[0];
  }
  async getHashPassword(login) {
    const hashPassword = await db.query(`SELECT password FROM users WHERE login = $1`, [login]);
    return hashPassword[0]
  }
  async isUserExisting(login) {
    const isUserExisting = await db.query(`SELECT id FROM users WHERE login = $1`, [login]);
    return isUserExisting[0] ? false : true
  }
}

module.exports = new AuthRepository();
