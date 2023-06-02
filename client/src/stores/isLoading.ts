import { ref } from "vue";
import { defineStore } from "pinia";

// CURRENT USER (AUTH)
export const useIsLoading = defineStore("isPageLoaded", () => {
  const isLoading = ref(true);
 
  function setIsLoading(isLoaded: boolean) {
    isLoading.value = isLoaded
  }

  return { isLoading, setIsLoading };
});