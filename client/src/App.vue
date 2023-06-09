<template>
  <app-header />
  <page-loader v-if="isLoadingStore.isLoading" />
  <main :class="{ content: userStore.isLogined, 'content-not-auth': !userStore.isLogined }">
    <left-sidebar v-if="userStore.isLogined" />
    <router-view />
  </main>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import LeftSidebar from "@/components/LeftSidebar.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user.ts";
import AuthApi from "@/Service/API/auth";
import AppHeader from "@/components/AppHeader.vue";
import RequestsApi from "@/Service/API/requests.ts";
import PageLoader from "@/UI/PageLoader.vue";
import { useIsLoading } from "@/stores/isLoading";
import UserApi from "@/Service/API/user.ts";

const userStore = useUserStore();
const isLoadingStore = useIsLoading();

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
* {
  color: rgb(44, 44, 44);
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
  padding: 40px 80px;
  flex: 1 1 auto;
}
.content {
  display: flex;
  padding-top: 60px;
  min-height: 100%;
}
.content-not-auth {
  text-align: center;
  padding-top: 100px;
}
.sidebar-wrap {
  position: relative;
  flex: 0 0 200px;
  font-size: 18px;
  letter-spacing: 1.5px;
  background-color: white;
  padding: 10px;
  z-index: 100;
  box-shadow: 0px 0px 7px rgb(196, 196, 196);
}
.sidebar-content {
  position: fixed;
}
a {
  transition: color 0.2s ease-in;
  &:hover {
    color: #1976d2;
  }
}
.auth-wrapper {
  margin: 0px auto;
  max-width: 800px;
}
</style>
