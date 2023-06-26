const Router = require("express");
const router = new Router();
const FriendsController = require("../controller/friends.contorller");

router.post("/add-friend", FriendsController.addFriend);
router.get("/get-friends", FriendsController.getFriendList);
router.get("/get-filtered-friends", FriendsController.getFriendsWithFilter);

module.exports = router;
