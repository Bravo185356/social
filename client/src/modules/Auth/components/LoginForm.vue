<template>
  <error-block :errors="errors" />
  <v-form>
    <v-text-field v-model="login" :counter="10" label="Логин" required></v-text-field>
    <v-text-field v-model="password" :counter="10" label="Пароль" required></v-text-field>
    <div>Нет аккаунта?<router-link to="/auth/registration"> Создайте его</router-link></div>
    <v-btn block @click.prevent="loginUser" type="submit">Войти</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import AuthApi from "@/Service/API/auth";
import ErrorBlock from "./ErrorBlock.vue";

const login = ref("");
const password = ref("");
const errors = ref([]);

const store = useUserStore();
const router = useRouter();

async function loginUser() {
  const { user, token, error } = await AuthApi.loginByForm({ login: login.value, password: password.value });
  if (!error) {
    store.setUser(user);
    localStorage.setItem("token", token);
    router.push("/");
  } else {
    errors.value = error;
  }
}
</script>
<style scoped lang="scss">
.error {
  color: red;
  margin-bottom: 15px;
  font-size: 20px;
  text-align: center;
}
</style>
