<template>
  <header class="header">
    <router-link to="/" class="title">Social</router-link>
    <router-link :to="{ path: store.isLogined ? '/profile' : '/login' }"
      ><v-btn :variant="buttonType">{{ buttonText }}</v-btn></router-link
    >
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user.ts";

const store = useUserStore();
const buttonText = computed(() => (store.isLogined ? store.getUser.name : "Логин"));
const buttonType = computed(() => (store.isLogined ? "text" : "elevated"));
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
  background-color: rgb(179, 223, 252);
  box-shadow: 0px 0px 10px gray;
  padding: 10px;
  max-height: 60px;
  z-index: 101;
}
.title {
  font-size: 32px;
}
</style>
