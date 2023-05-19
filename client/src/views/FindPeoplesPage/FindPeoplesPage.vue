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
import { useFriendStore } from "@/stores/friends.ts";
import FilterSidebar from "@/components/FilterSidebar/FilterSidebar.vue";
import UserApi from "@/Service/API/users.ts";
import FriendApi from "@/Service/API/friends.ts";
import UserItem from './Components/UserItem/UserItem.vue'

const userStore = useUserStore();
const friendStore = useFriendStore();

const users = ref([]);

onMounted(async () => {
  const userList = await UserApi.getAllUsers();
  users.value = userList.rows;
  const friendList = await FriendApi.getMyFriends(userStore.getUser.id);
  await friendStore.setFriends(friendList);
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
