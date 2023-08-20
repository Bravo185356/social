const db = require("../db");

class ChatRepository {
  async getAllChats(id) {
    const chats = await db.query(
      `SELECT chat_id, user_id, name, surname, img FROM chats_users
        JOIN users ON chats_users.user_id = users.id
        WHERE chats_users.chat_id = ANY(SELECT chat_id FROM chats_users WHERE user_id = $1)
        AND chats_users.user_id != $1`,
      [id]
    );
    return chats;
  }
  async getAllMessages(userId) {
    const messages = await db.query(
      `SELECT message_id, content, user_id, chat_id, name, surname, img FROM messages
        JOIN users ON users.id = messages.user_id AND messages.chat_id = $1`,
      [userId]
    );
    return messages;
  }
  async createNewChat(chatId, myId, userId) {
    await db.query(`INSERT INTO chats (chat_id) values ($1)`, [chatId]);
    const newChatId = await db.query(`INSERT INTO chats_users (chat_id, user_id) values ($1, $2), ($1, $3) RETURNING *`, [
      chatId,
      myId,
      userId,
    ]);
    return newChatId[0];
  }
  async createNewMessage(chatId, myId, content) {
    const newMessage = await db.query(`INSERT INTO messages (chat_id, user_id, content) values ($1, $2, $3) RETURNING *`, [
      chatId,
      myId,
      content,
    ]);
    return newMessage[0];
  }
  async getUsersInfo(user_1, user_2) {
    const user = await db.query(`SELECT id AS user_id, name, surname, img FROM users WHERE id = $1 OR id = $2`, [user_1, user_2])
    return user
  }
}

module.exports = new ChatRepository();
