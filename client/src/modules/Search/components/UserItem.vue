<template>
  <div class="user-item">
    <div class="user-body">
      <div class="user-image">
        <img :src="getImageUrl(user.img)" alt="Аватар" />
      </div>
      <div class="user-info">
        <div>id: {{ user.id }}</div>
        <router-link :to="{ path: `/${user.id}` }">{{ user.name }} {{ user.surname }}</router-link>
        <div>Город: {{ user.city }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineProps, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const props = defineProps({
  user: { type: Object },
});
</script>
<style>
.user-body {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.user-item {
  align-items: center;
  gap: 10px;
  background-color: rgb(207, 207, 207);
  padding: 20px;
  border-radius: 10px;
}
.user-image {
  position: relative;
  background-color: gray;
  width: 60px;
  height: 60px;
}
.user-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
