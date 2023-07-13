const Router = require("express");
const router = new Router();
const SearchController = require("../controller/search.controller");

router.get("/search", SearchController.getAllUsers);
router.get("/get-filtered-users", SearchController.getUsersWithFilter);
router.get("/get-user", SearchController.getUserInfo);

module.exports = router;
