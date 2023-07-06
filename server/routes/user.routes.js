const Router = require("express");
const router = new Router();
const UserController = require("../controller/user.controller");

router.get("/search", UserController.getAllUsers);
router.get('/get-filtered-users', UserController.getUsersWithFilter)
router.get("/get-user", UserController.getUserInfo);
router.post('/set-last-visit', UserController.setLastVisitTime)

module.exports = router;