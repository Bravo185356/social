<template>
  <div class="sidebar-wrap">
    <div class="sidebar-content">
      <ul class="sidebar-list">
        <li class="sidebar-item">Лента</li>
        <li class="sidebar-item"><router-link to="/messager" class="sidebar-item">Сообщения</router-link></li>
        <li><router-link to="/search" class="sidebar-item">Найти людей</router-link></li>
        <li><router-link to="/friends" class="sidebar-item">Друзья</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.sidebar-item {
  cursor: pointer;
  transition: color 0.2s ease-in;
}
</style>
