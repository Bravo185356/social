const Router = require("express");
const router = new Router();
const { check } = require("express-validator");

const AuthController = require("../controller/auth.controller");

router.post(
  "/create",
  [
    check("login", "Логин не должен быть короче 6 символов").trim().isLength({ min: 6 }),
    check("password", "Пароль должен содержать минимум 4 символа").trim().isLength({ min: 4 }),
    check('name', 'Не указано имя').trim().notEmpty(),
    check('surname', 'Не указана фамилия').trim().notEmpty()
  ],
  AuthController.createUser
);
router.post("/login", AuthController.loginOnPageLoad);
router.post("/login-by-form", AuthController.loginByForm);

module.exports = router;
