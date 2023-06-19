<template>
  <div class="users-body">
    <div class="title">Поиск людей</div>
    <div class="user-list">
      <user-item v-for="user in userList" :user="user" />
    </div>
  </div>
  <filter-sidebar />
</template>
<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ref } from "vue";
import FilterSidebar from "@/modules/Search/components/FilterSidebar.vue";
import UserItem from "@/modules/Search/components/UserItem.vue";
import SearchApi from "../API/SearchApi.ts";

const props = defineProps({
  users: Array,
});

const router = useRouter();

const userList = ref(props.users);

onBeforeRouteUpdate(async (to, from) => {
  const users = await SearchApi.getAllUsers(to.query);
  userList.value = users;
});
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
  padding: 40px 80px;
  flex: 1 1 auto;
}
</style>
