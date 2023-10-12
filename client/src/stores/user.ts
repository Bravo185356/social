import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {useRouter} from 'vue-router'
import { useWebsocketsStore } from "./websockets";


// CURRENT USER (AUTH)
export const useUserStore = defineStore("user", () => {
  const user = ref({}) as any;
  const isLogined = ref(false);
  
  const router = useRouter()
  const websocketsStore = useWebsocketsStore()

  function setUser(userInfo: any) {
    user.value = userInfo;
    isLogined.value = true
  }
  function changeField(field: string, value: string) {
    user.value[field] = value
  }
  function logout() {
    localStorage.removeItem("token");
    $reset();
    console.log(router)
    router.push("/auth/login");
    for (const websocket in websocketsStore.getWebsockets) {
      websocketsStore.getWebsockets[websocket].close();
    }
  }
  function $reset() {
    user.value = {}
    isLogined.value = false
  }
  const getIsLogined = computed(() => isLogined.value);
  const getUser:any = computed(() => user.value);

  return { user, setUser, getUser, isLogined, getIsLogined, $reset, changeField, logout };
});
