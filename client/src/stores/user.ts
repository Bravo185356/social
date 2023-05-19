import { ref, computed } from "vue";
import { defineStore } from "pinia";
// CURRENT USER (AUTH)
export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const isLogined = ref(false);

  async function setUser(userInfo: any) {
    user.value = userInfo;
    console.log(user.value)
    isLogined.value = true
  }
  function $reset() {
    user.value = {}
    isLogined.value = false
  }
  const getIsLogined = computed(() => isLogined.value);
  const getUser = computed(() => user.value);

  return { user, setUser, getUser, isLogined, getIsLogined, $reset };
});
