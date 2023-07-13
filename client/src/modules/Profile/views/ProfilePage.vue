<template>
  <div class="body">
    <profile-info />
    <v-btn @click="logout">Выйти</v-btn>
  </div>
</template>
<script setup lang="ts">
import ProfileInfo from "../components/ProfileInfo.vue";
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
<style lang="scss"></style>
