const ChatController = require("./controller/chat.controller");
const ws = require("ws");

class Websockets {
  createChatWebsocket() {
    const wssChat = new ws.Server({
      port: 5000,
    });
    wssChat.on("connection", async function connection(ws) {
      console.log("connected 5000");
      ws.on("message", async function message(msg) {
        const message = JSON.parse(msg);
        switch (message.type) {
          case "newMessage":
            let newChatId;
            if (message.isFirstMessage) {
              newChatId = await ChatController.createNewChat(message.chatId, message.myId, message.userId);
            }
            const messageItem = await ChatController.createNewMessage(message.chatId, message.myId, message.content);
            wssChat.clients.forEach((client) => {
              if (client.id == message.userId) {
                client.send(JSON.stringify({ type: "getMessage", message: messageItem }));
              }
            });
            ws.send(JSON.stringify({ type: "getMessage", message: messageItem }));
            break;
          case "setId":
            ws.id = message.id;
            break;
        }
      });
    });
  }
}

module.exports = new Websockets();
