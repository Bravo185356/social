<template>
  <div class="sidebar">
    <ul class="sidebar-list">
      <li class="sidebar-item">Лента</li>
      <li class="sidebar-item">Сообщения</li>
      <router-link to="/search" class="sidebar-item">Найти людей</router-link>
      <li class="sidebar-item">Друзья</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<style scoped lang="scss">
.sidebar {
  position: fixed;
  height: 100%;
  background-color: rgb(179, 223, 252);;
  width: 200px;
  padding: 10px;
  z-index: 100;
}
</style>
