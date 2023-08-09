const bcrypt = require("bcrypt");
const defaultImg = require("../constants");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const AuthRepository = require('../repositories/authRepository')

class AuthController {
  async createUser(req, res) {
    const { name, surname, login, password, city } = req.body;
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const date = new Date().toISOString();
    await AuthRepository.createUser(name, surname, login, hashPassword, city, date, defaultImg)
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
      const user = await AuthRepository.getUser(result.login)
      const token = jwt.sign({ login: result.login, password: result.password }, 'secret', { expiresIn: '24h' });
      res.json({ user, newToken: token });
    }
  }
  async loginByForm(req, res) {
    const { login, password } = req.body;
    const errors = validationResult(req).formatWith((error) => error.msg).array();
    if(errors.length) {
      const formatErrors = Array.from(new Set(errors))
      return res.json({ error: formatErrors });
    }
    const user = await AuthRepository.getUser(login)
    const token = jwt.sign({ login, password }, 'secret', { expiresIn: '24h' });
    res.json({ user, token });
  }
  async checkPassword(login, password) {
    const hashPassword = await AuthRepository.getHashPassword(login);
    if(!hashPassword) {
      return false
    }
    const match = await bcrypt.compare(password, hashPassword.password);
    return match
  }
}

module.exports = new AuthController();
