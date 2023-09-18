<template>
  <app-header />
  <page-loader v-if="isLoadingStore.isLoading" />
  <main :class="{ content: userStore.isLogined, 'content-not-auth': !userStore.isLogined }">
    <left-sidebar v-if="userStore.isLogined" />
    <div class="wrapper">
      <router-view />
    </div>
  </main>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import LeftSidebar from "@/components/LeftSidebar.vue";
import { onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user.ts";
import AuthApi from "@/Service/API/auth";
import AppHeader from "@/components/AppHeader.vue";
import RequestsApi from "@/Service/API/requests.ts";
import PageLoader from "@/UI/PageLoader.vue";
import { useIsLoading } from "@/stores/isLoading";
import UserApi from "@/Service/API/user.ts";
import { useWebsocketsStore } from "@/stores/websockets.ts";

const userStore = useUserStore();
const isLoadingStore = useIsLoading();
const websocketStore = useWebsocketsStore();

const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");

  window.addEventListener("beforeunload", () => {
    UserApi.setLastVisitTime(userStore.getUser.id);
  });

  if (!token) {
    router.push("/auth/login");
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&family=Roboto:wght@400;700&display=swap");
* {
  color: black;
}
input:focus {
  border: none;
  outline: none;
}
.wrapper {
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
}
.main {
  position: relative;
  display: flex;
  padding-top: 60px;
  min-height: 100%;
}
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: white;
}
.body {
  position: relative;
  flex: 1 1 auto;
  padding: 131px 50px;
}
.content {
  display: flex;
  padding-top: 60px;
  min-height: 100%;
}
.content-not-auth {
  text-align: center;
}
.v-messages__message {
  text-align: left;
}
.sidebar-wrap {
  position: relative;
  flex: 0 0 200px;
  font-size: 18px;
  letter-spacing: 1.5px;
  background-color: white;
  z-index: 100;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
}
.sidebar-content {
  position: fixed;
}
.auth-wrapper {
  margin: 0px auto;
  max-width: 800px;
}
</style>
