<template>
  <header class="header">
    <router-link to="/" class="title">Social</router-link>
    <header-notifications v-if="userStore.isLogined" />
    <router-link :to="{ path: userStore.isLogined ? '/profile' : '/auth/login' }">
      <v-btn :variant="buttonType">{{ buttonText }}</v-btn>
    </router-link>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import HeaderNotifications from "./HeaderNotifications.vue";
import { useUserStore } from "@/stores/user.ts";
import RequestApi from "@/Service/API/requests.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const userStore = useUserStore();

const buttonText = computed(() => (userStore.isLogined ? userStore.getUser.name : "Логин"));
const buttonType = computed(() => (userStore.isLogined ? "text" : "elevated"));

</script>
<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid rgb(207, 207, 207);
  padding: 10px;
  max-height: 60px;
  z-index: 101;
  gap: 30px;
}
.title {
  font-size: 32px;
}
</style>
