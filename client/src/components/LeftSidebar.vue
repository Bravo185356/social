<template>
  <div class="sidebar-wrap">
    <div class="sidebar-content">
      <ul class="sidebar-list">
        <li class="sidebar-item">
          <router-link to="/messager" class="sidebar-link"
            ><img src="../assets/icons/message-square.svg" alt="message icon" />Сообщения</router-link
          >
        </li>
        <li class="sidebar-item">
          <router-link to="/search" class="sidebar-link"
            ><img src="../assets/icons/search.svg" alt="search icon" />Найти людей</router-link
          >
        </li>
        <li class="sidebar-item"><router-link to="/friends" class="sidebar-link">Друзья</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.sidebar-list {
  display: block;
  width: 200px;
}
.sidebar-item {
  cursor: pointer;
  &:hover {
    background: #98fff4;
  }
}
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 15px;
}
</style>
