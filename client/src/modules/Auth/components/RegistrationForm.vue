<template>
  <v-form>
    <v-text-field v-model="firstName" :counter="10" label="first name" required></v-text-field>
    <v-text-field v-model="surname" :counter="10" label="surname" required></v-text-field>
    <v-text-field v-model="login" :counter="10" label="login" required></v-text-field>
    <v-text-field v-model="password" :counter="10" label="password" required></v-text-field>
    <v-text-field v-model="confirmPassword" :counter="10" label="confirmPassword" required></v-text-field>
    <v-text-field v-model="city" :counter="10" label="city" required></v-text-field>
    <v-btn block @click.prevent="createUser" type="submit">Создать</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import AuthApi from "@/Service/API/auth";
import { ref } from "vue";

const firstName = ref("");
const surname = ref("");
const login = ref("");
const password = ref("");
const confirmPassword = ref("");
const city = ref("");

async function createUser() {
  const formInputs = {
    name: firstName.value,
    surname: surname.value,
    login: login.value,
    password: password.value,
    city: city.value,
  };
  const response = await AuthApi.createUser(formInputs);
}
</script>
<style lang="scss">
.modal {
  padding: 10px;
}
</style>
