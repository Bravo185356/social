<script setup lang="ts">
import { useRouter } from "vue-router";
import LeftSidebar from "@/components/Sidebar/LeftSidebar.vue";
import { onMounted, onUpdated, ref } from "vue";
import { useUserStore } from "@/stores/user.ts";
import {useFriendStore} from '@/stores/friends.ts'
import AuthApi from "@/Service/API/auth";
import FriendApi from '@/Service/API/friends.ts'
import AppHeader from "@/components/AppHeader/AppHeader.vue";

const userStore = useUserStore();
const friendStore = useFriendStore();
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = await AuthApi.loginOnPageLoad(token);
    await userStore.setUser(user.rows[0]);
  } else {
    router.push('/auth/login');
  }
});
</script>

<template>
  <app-header />
  <main class="main">
    <div>
      <left-sidebar v-if="userStore.isLogined" />
      <div :class="{ content: userStore.isLogined, 'content-not-auth': !userStore.isLogined }">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
* {
  color: rgb(44, 44, 44);
}
.main {
  position: relative;
  display: grid;
  grid-template: 1fr / 1fr;
  padding-top: 60px;
  height: 100%;
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
.content {
  padding: 40px 40px 40px 240px;
}
.content-not-auth {
  text-align: center;
  padding: 40px;
}
</style>
