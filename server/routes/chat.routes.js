const Router = require("express");
const router = new Router();
const ChatController = require("../controller/chat.controller");

router.get("/chat/get-all-chats", ChatController.getAllChats);
router.get("/chat/get-all-messages", ChatController.getAllMessages);
router.get("/chat/get-users", ChatController.getUsersInChat);

module.exports = router;
