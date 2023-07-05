import { ref } from "vue";
import { defineStore } from "pinia";

export const useIsLoading = defineStore("isPageLoaded", () => {
  const isLoading = ref(true);
 
  function setIsLoading(isLoaded: boolean) {
    isLoading.value = isLoaded
  }

  return { isLoading, setIsLoading };
});