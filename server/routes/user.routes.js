const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");

router.post("/set-last-visit", UserController.setLastVisitTime);

module.exports = router;
