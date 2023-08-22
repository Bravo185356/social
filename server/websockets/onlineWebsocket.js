const ws = require("ws");
const UserRepository = require("../repositories/userRepository");

function createOnlineStatusWebsocket() {
  const wssOnlineStatus = new ws.Server({
    port: 3000,
  });
  wssOnlineStatus.on("connection", (ws) => {
    console.log("connected online status websocket");
    ws.on("message", async (msg) => {
      const message = JSON.parse(msg);
      ws.id = message.id
      await UserRepository.changeOnlineStatus(ws.id, 1);
      console.log(Date.now())
    });
    ws.on("close", async (e) => {
      console.log('disconnected')
      await UserRepository.changeOnlineStatus(ws.id, 0);
    });
  });
}

module.exports = createOnlineStatusWebsocket;
