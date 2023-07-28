import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useWebsocketsStore = defineStore("websockets", () => {
  const wsChats = ref(null) as any;

  function setWebsocket(type: string, ws: WebSocket) {
    switch (type) {
      case "chat":
        wsChats.value = ws;
        break;
    }
  }
  const getWsChat = computed(() => wsChats.value)

  return { setWebsocket, getWsChat };
});
