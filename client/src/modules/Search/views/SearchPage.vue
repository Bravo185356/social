<template>
  <div class="users-body">
    <div class="title">Поиск людей</div>
    <div class="user-list">
      <user-item v-for="user in props.users" :user="user" />
    </div>
  </div>
  <filter-sidebar />
</template>
<script setup lang="ts">
import FilterSidebar from "@/modules/Search/components/FilterSidebar.vue";
import UserItem from "@/modules/Search/components/UserItem.vue";

const props = defineProps({
  users: Array
})
</script>
<style scoped>
.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
}
.user-list {
  display: grid;
  gap: 10px;
}
.users-body {
  padding-top: 40px;
  flex: 1 1 auto;
}
</style>
