const Router = require("express");
const router = new Router();
const ChatController = require("../controller/chat.controller");

router.get("/chats/:userId", ChatController.getAllChats);
router.get("/chat/messages/:userId", ChatController.getAllMessages);
router.get("/chat/users", ChatController.getUsersInfo);

module.exports = router;
