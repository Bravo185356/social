<template>
  <div class="body">
    <profile-info />
    <div class="profile-actions">
      <v-btn @click="logout">Выйти</v-btn>
      <v-btn @click="deleteUser">Удалить страницу</v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProfileInfo from "../components/ProfileInfo.vue";
import UserApi from "@/Service/API/user.ts";
import { useUserStore } from "@/stores/user.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

function logout() {
  localStorage.removeItem("token");
  userStore.$reset();
  router.push("/auth/login");
}
async function deleteUser() {
  UserApi.deleteUser(userStore.getUser.id);
  logout();
}
</script>
<style scoped lang="scss">
.profile-actions {
  display: flex;
  gap: 10px;
}
</style>
