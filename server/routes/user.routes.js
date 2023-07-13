const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");

router.post("/set-last-visit", UserController.setLastVisitTime);
router.post("/delete-user", UserController.deleteUser);

module.exports = router;
