<template>
  <error-block :errors="errors" />
  <v-form ref="form">
    <v-text-field v-model="login" :rules="[rules.required]" variant="underlined" label="Логин" required></v-text-field>
    <v-text-field v-model="password" :rules="[rules.required]" variant="underlined" label="Пароль" required></v-text-field>
    <div>Нет аккаунта?<router-link to="/auth/registration"> Создайте его</router-link></div>
    <blue-button class="submit-btn" @click.prevent="loginUser" type="submit">Войти</blue-button>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import AuthApi from "@/Service/API/auth";
import ErrorBlock from "./ErrorBlock.vue";
import connectToWebsockets from "@/helpers/connectToWebsockets";
import BlueButton from '@/UI/BlueButton.vue'

const rules = {
  required: (value) => !!value || "Заполните поле"
};

const login = ref("");
const password = ref("");
const errors = ref([]);
const form = ref("");

const store = useUserStore();
const router = useRouter();

async function loginUser() {
  const { valid } = await form.value.validate();
  if (valid) {
    const { user, token, error } = await AuthApi.loginByForm({ login: login.value, password: password.value });
    if (!error) {
      store.setUser(user);
      localStorage.setItem("token", token);
      router.push("/");
      connectToWebsockets();
    } else {
      errors.value = error;
    }
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
