const Router = require("express");
const router = new Router();

const AuthController = require("../controller/auth.controller");

router.post("/create", AuthController.createUser);
router.post("/login", AuthController.loginOnPageLoad);
router.post('/login-by-form', AuthController.loginByForm)

module.exports = router;
