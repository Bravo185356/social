<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

function logout() {
  localStorage.removeItem("token");
  store.$reset();
  router.push("/auth/login");
}
</script>
<style lang=""></style>
