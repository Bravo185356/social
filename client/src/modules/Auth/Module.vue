<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (userStore.isLogined) {
    router.push("/");
  }
});
</script>
