<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { useFriendStore } from "@/stores/friends.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();
const friendStore = useFriendStore()

function logout() {
  localStorage.removeItem("token");
  store.$reset();
  friendStore.$reset()
  router.push("/");
}
</script>
<style lang=""></style>
