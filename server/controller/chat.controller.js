const db = require("../db");

class ChatController {
  async getAllChats(req, res) {
    const { id } = req.query;
    const chats = await db.query(
      `SELECT chat_id, user_id, name, surname, img FROM chats_users
      JOIN users ON chats_users.user_id = users.id AND chats_users.user_id != $1`,
      [id]
    );
    res.json(chats.rows);
  }
  async getAllMessages(req, res) {
    const { chatId } = req.query;
    const messages = await db.query(
      `SELECT message_id, content, user_id, chat_id, name, surname, img FROM messages
      JOIN users ON users.id = messages.user_id AND messages.chat_id = $1`,
      [chatId]
    );
    res.json(messages.rows);
  }
  async createNewChat(chatId, myId, userId) {
    await db.query(`INSERT INTO chats (chat_id) values ($1)`, [chatId]);
    const newChatId = await db.query(`INSERT INTO chats_users (chat_id, user_id) values ($1, $2), ($1, $3) RETURNING *`, [
      chatId,
      myId,
      userId,
    ]);
    return newChatId.rows[0];
  }
  async createNewMessage(chatId, myId, content) {
    const newMessage = await db.query(`INSERT INTO messages (chat_id, user_id, content) values ($1, $2, $3) RETURNING *`, [
      chatId,
      myId,
      content,
    ]);
    return newMessage.rows[0];
  }
  async getUsersInChat(req, res) {
    const { chatId } = req.query;
    const users = await db.query(
      `SELECT name, surname, img, user_id, chat_id FROM chats_users
      JOIN users ON chats_users.user_id = users.id AND chats_users.chat_id = $1`,
      [chatId]
    );
    res.json(users.rows);
  }
}

module.exports = new ChatController();
