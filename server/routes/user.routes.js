const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");

router.post("/user/last-visit", UserController.setLastVisitTime);
router.post("/user/delete", UserController.deleteUser);
router.post('/user/online-status')

module.exports = router;
