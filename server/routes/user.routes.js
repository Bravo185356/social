const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");

router.get("/search", UserController.getAllUsers);
router.get("/get-user", UserController.getUserInfo);

module.exports = router;