import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useWebsocketsStore = defineStore("websockets", () => {
  const websockets = ref({}) as any

  function setWebsocket(type: string, ws: WebSocket) {
    websockets.value[type] = ws
  }
  const getWebsockets = computed(() => websockets.value)

  return { setWebsocket, getWebsockets };
});
