<template>
  <v-form>
    <div class="error" v-if="errorMessage">{{ errorMessage.value }}</div>
    <v-text-field v-model="login" :counter="10" label="Логин" required></v-text-field>
    <v-text-field v-model="password" :counter="10" label="Пароль" required></v-text-field>
    <div>Нет аккаунта?<router-link to="/registration"> Создайте его</router-link></div>
    <v-btn block @click.prevent="loginUser" type="submit">Войти</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import AuthApi from '@/Service/API/auth.ts'

const login = ref("");
const password = ref("");
const errorMessage = ref("");

const store = useUserStore()
const router = useRouter()

async function loginUser() {
  const user = await AuthApi.loginByForm({login: login.value, password: password.value})

  if (user.rows) {
    store.setUser(user.rows[0])
    localStorage.setItem("token", user.rows[0].id);
    router.push("/");
  } else {
    errorMessage.value = user;
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
