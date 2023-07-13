<template>
  <div class="info-wrapper">
    <div class="img-block">
      <img class="img" :src="getImageUrl(userStore.getUser.img)" alt="" />
    </div>
    <div>
      <div>Имя {{ userStore.getUser.name }} {{ userStore.getUser.name }}</div>
      <div>Логин: {{ userStore.getUser.login }}</div>
      <div>Город: {{ userStore.getUser.city }}</div>
      <div>Дата регистрации: {{ FormatDate(userStore.getUser.registration_date) }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import { FormatDate } from "@/helpers/FormatDate.ts";

const userStore = useUserStore();
</script>
<style scoped lang="scss">
.info-wrapper {
  display: flex;
  gap: 30px;
}
.img-block {
  position: relative;
  width: 300px;
  height: 300px;
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
