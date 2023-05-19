<template>
  <div class="not-auth" v-if="!store.getUser.id">Войдите, чтобы продолжить</div>
  <router-link to="/login"><v-btn>Войти</v-btn></router-link>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { onMounted } from "vue";
import AuthApi from "@/Service/API/auth.ts";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useUserStore();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push(`/${store.getUser.id}`);
  }
});
</script>
<style lang="scss">
.not-auth {
  font-size: 32px;
}
</style>
