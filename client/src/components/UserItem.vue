<template>
  <div class="user-item">
    <div class="user-body">
      <div class="user-image">
        <img :src="getImageUrl(user.img)" alt="Аватар" />
      </div>
      <div class="user-info">
        <router-link :to="{ path: `/${user.id}` }">{{ user.name }} {{ user.surname }}</router-link>
        <div v-if="user.status">Online</div>
        <div>id: {{ user.id }}</div>
        <div>{{ user.city }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const props = defineProps({
  user: { type: Object },
});
</script>
<style scoped>
.user-body {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.user-item {
  font-size: 20px;
  border-bottom: 1px solid rgb(190, 190, 190);
  padding: 20px;
}
.user-image {
  position: relative;
  width: 100px;
  height: 100px;
}
.user-image img {
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
