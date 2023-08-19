<template>
  <div class="body">
    <div class="title">Поиск людей</div>
    <div class="user-list">
      <user-item v-for="user in userList" :user="user" />
    </div>
  </div>
  <filter-sidebar @accept-filter="acceptFilter" />
</template>
<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ref } from "vue";
import FilterSidebar from "@/components/FilterSidebar.vue";
import UserItem from "@/components/UserItem.vue";
import SearchApi from "../API/SearchApi.ts";

const props = defineProps({
  users: Array,
});

const router = useRouter();
const userList = ref(props.users);

function acceptFilter(name) {
  if(name === '') {
    return
  }
  let query = {
    name: name.split(' ')[0]
  }
  const surname = name.split(' ')[1]
  query.surname = surname && surname

  router.push({ path: "/search", query: query });
}

onBeforeRouteUpdate(async (to, from) => {
  console.log('updated')
  const users = await SearchApi.getUsersWithFilter(to.query);
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
</style>
