const ChatRepository = require('../repositories/chatRepository')

class ChatController {
  async getAllChats(req, res) {
    const { id } = req.query;
    const chats = await ChatRepository.getAllChats(id)
    res.json(chats);
  }
  async getAllMessages(req, res) {
    const { chatId } = req.query;
    const messages = await ChatRepository.getAllMessages(chatId)
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
  async getUsersInChat(req, res) {
    const { chatId } = req.query;
    const users = await ChatRepository.getUsersInChat(chatId)
    res.json(users);
  }
}

module.exports = new ChatController();
