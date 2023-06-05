<template>
  <div class="users-body">
    <div class="title">Поиск людей</div>
    <div class="user-list">
      <user-item v-for="user in users" :user="user" />
    </div>
  </div>
  <filter-sidebar />
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/user.ts";
import FilterSidebar from "@/modules/Search/components/FilterSidebar.vue";
import SearchApi from "../API/SearchApi.ts";
import FriendApi from "@/Service/API/friends.ts";
import UserItem from "@/modules/Search/components/UserItem.vue";
import { useIsLoading } from "@/stores/isLoading.js";

const userStore = useUserStore();
const isLoadingStore = useIsLoading();

const users = ref([]);

onMounted(async () => {
  const userList = await SearchApi.getAllUsers();
  users.value = userList.rows;
});
</script>
<style scoped>
.users-body {
  flex: 1 1 auto;
  padding-right: 200px;
}
.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}
.user-list {
  display: grid;
  gap: 10px;
}
</style>
