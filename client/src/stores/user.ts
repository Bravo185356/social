import { ref, computed } from "vue";
import { defineStore } from "pinia";

// CURRENT USER (AUTH)
export const useUserStore = defineStore("user", () => {
  const user = ref({}) as any;
  const isLogined = ref(false);

  function setUser(userInfo: any) {
    user.value = userInfo;
    isLogined.value = true
  }
  function changeField(field: string, value: string) {
    user.value[field] = value
  }
  function $reset() {
    user.value = {}
    isLogined.value = false
  }
  const getIsLogined = computed(() => isLogined.value);
  const getUser:any = computed(() => user.value);

  return { user, setUser, getUser, isLogined, getIsLogined, $reset, changeField };
});
