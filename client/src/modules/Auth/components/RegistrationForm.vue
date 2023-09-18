<template>
  <error-block :errors="errors" />
  <v-form ref="form">
    <v-text-field v-model="firstName" :rules="[rules.required]" label="first name" variant="underlined" required></v-text-field>
    <v-text-field v-model="surname" :rules="[rules.required]" label="surname" variant="underlined" required></v-text-field>
    <v-text-field v-model="login" :rules="[rules.required, rules.min]" label="login" variant="underlined" required></v-text-field>
    <v-text-field
      v-model="password"
      :rules="[rules.required, rules.min]"
      label="password"
      variant="underlined"
      required
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      :rules="[rules.required, rules.confirmPass]"
      variant="underlined"
      label="confirmPassword"
      required
    ></v-text-field>
    <v-text-field v-model="city" label="city" variant="underlined" required></v-text-field>
    <blue-button class="submit-btn" block @click.prevent="createUser" type="submit">Создать</blue-button>
  </v-form>
</template>
<script setup lang="ts">
import AuthApi from "@/Service/API/auth";
import { ref } from "vue";
import ErrorBlock from "./ErrorBlock.vue";
import BlueButton from '@/UI/BlueButton.vue'

const rules = {
  required: (value) => !!value || "Необходимое поле",
  min: (value) => value.length >= 6 || "Минимальная длина 6 символов",
  confirmPass: (value) => value == password.value || "Пароли не совпадают",
};

const firstName = ref("");
const surname = ref("");
const login = ref("");
const password = ref("");
const confirmPassword = ref("");
const city = ref("");
const errors = ref([]);
const form = ref("");

async function createUser() {
  const { valid } = await form.value.validate();
  if (valid) {
    const formInputs = {
      name: firstName.value,
      surname: surname.value,
      login: login.value,
      confirmPassword: confirmPassword.value,
      password: password.value,
      city: city.value,
    };
    const response = await AuthApi.createUser(formInputs);
    if (response.error) {
      errors.value = response.error;
    }
  }
}
</script>
<style lang="scss"></style>
