<template>
  <div class="friends-body">
    <div class="friends-list">
      <user-item v-for="friend in friendList" :user="friend"></user-item>
    </div>
  </div>
  <filter-sidebar @accept-filter="acceptFilter" />
</template>
<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ref } from "vue";
import FilterSidebar from "@/components/FilterSidebar.vue";
import UserItem from "@/components/UserItem.vue";
import FriendApi from "@/Service/API/friends.ts";
import { useUserStore } from "@/stores/user.ts";

const props = defineProps({
  friends: Array,
});

const userStore = useUserStore();
const router = useRouter();
const friendList = ref(props.friends);

function acceptFilter(name) {
  if (name === "") {
    return;
  }
  let query = {
    name: name.split(" ")[0],
  };
  const surname = name.split(" ")[1];
  query.surname = surname && surname;

  router.push({ path: "/friends", query: query });
}

onBeforeRouteUpdate(async (to) => {
  const filteredFriends = await FriendApi.getFriendsWithFilter(userStore.getUser.id, to.query);
  friendList.value = filteredFriends;
});
</script>
<style scoped>
.friends-body {
  padding: 40px 80px;
  flex: 1 1 auto;
}
.friends-list {
  display: grid;
  gap: 10px;
}
</style>
