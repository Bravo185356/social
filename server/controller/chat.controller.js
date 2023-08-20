const ChatRepository = require('../repositories/chatRepository')

class ChatController {
  async getAllChats(req, res) {
    const { userId } = req.params
    const chats = await ChatRepository.getAllChats(userId)
    res.json(chats);
  }
  async getAllMessages(req, res) {
    const { userId } = req.params;
    const messages = await ChatRepository.getAllMessages(userId)
    res.json(messages);
  }
  async createNewChat(chatId, myId, userId) {
    const newChatId = await ChatRepository.createNewChat(chatId, myId, userId)
    return newChatId;
  }
  async createNewMessage(chatId, myId, content) {
    const newMessage = await ChatRepository.createNewMessage(chatId, myId, content)
    return newMessage;
  }
  async getUsersInfo(req, res) {
    const { user_1, user_2 } = req.query
    const user = await ChatRepository.getUsersInfo(user_1, user_2)
    res.json(user)
  }
}

module.exports = new ChatController();
