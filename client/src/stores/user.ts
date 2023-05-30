import { ref, computed, type ComputedRef } from "vue";
import { defineStore } from "pinia";

// CURRENT USER (AUTH)
export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const isLogined = ref(false);

  async function setUser(userInfo: any) {
    user.value = userInfo;
    isLogined.value = true
  }
  function $reset() {
    user.value = {}
    isLogined.value = false
  }
  const getIsLogined = computed(() => isLogined.value);
  const getUser:any = computed(() => user.value);

  return { user, setUser, getUser, isLogined, getIsLogined, $reset };
});
