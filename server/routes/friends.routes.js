const Router = require("express");
const router = new Router();
const FriendsController = require("../controller/friends.contorller");

router.post("/friends/add", FriendsController.addFriend);
router.get("/friends/:userId", FriendsController.getFriendList);
router.get("/friends/filtered", FriendsController.getFriendsWithFilter);

module.exports = router;
