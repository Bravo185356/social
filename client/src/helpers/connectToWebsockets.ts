import { useWebsocketsStore } from "@/stores/websockets";
import { useUserStore } from "@/stores/user";

export default function connectToWebsockets() {
  const userStore = useUserStore();
  const websocketStore = useWebsocketsStore();

  const wsChat = new WebSocket("ws://localhost:5000");
  const wsOnlineStatus = new WebSocket("ws://localhost:3000");

  wsChat.onopen = () => {
    wsChat.send(JSON.stringify({ type: "setId", id: userStore.getUser.id }));
  };
  wsOnlineStatus.onopen = () => {
    wsOnlineStatus.send(JSON.stringify({ id: userStore.getUser.id }));
  };

  websocketStore.setWebsocket("onlineStatus", wsOnlineStatus);
  websocketStore.setWebsocket("chat", wsChat);
}