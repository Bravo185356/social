<template>
  <div class="body">
    <div class="title">Поиск людей</div>
    <search-input
      @accept-filter="acceptFilter"
      @toggle-filter-sidebar="showFilterSidebar = !showFilterSidebar"
      @update-name="(newName) => (nameInput = newName)"
      @clear-name="nameInput = ''"
    />
    <div class="user-list">
      <user-item v-for="user in userList" :user="user" />
    </div>
  </div>
  <filter-sidebar
    @update-filters="(newFilters) => (filters = newFilters)"
    @close-sidebar="showFilterSidebar = false"
    :showFilterSidebar="showFilterSidebar"
  />
</template>
<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import FilterSidebar from "@/components/FilterSidebar.vue";
import UserItem from "@/components/UserItem.vue";
import SearchApi from "../API/SearchApi.ts";
import SearchInput from "@/components/SearchInput.vue";


const route = useRoute();
const router = useRouter();
const userList = ref(null);
const showFilterSidebar = ref(false);
const filters = ref({});
const nameInput = ref("");

function acceptFilter() {
  handleName();
  const query = formQueryObject();
  router.push({ path: "/search", query });
}
function handleName() {
  if (nameInput.value) {
    const filtersValueTemp = nameInput.value;
    if (nameInput.value.split(" ").length == 2) {
      filters.value.name = nameInput.value.split(" ")[0];
      filters.value.surname = filtersValueTemp.split(" ")[1];
    } else {
      filters.value.name = nameInput.value.split(" ")[0];
    }
  }
}
function formQueryObject() {
  const query = {};
  for (const key in filters.value) {
    if (filters.value[key] !== "") {
      query[key] = filters.value[key];
    }
  }
  return query;
}
async function fetchUsers(route) {
  let users;
  if (route.fullPath == "/search") {
    users = await SearchApi.getAllUsers();
  } else {
    users = await SearchApi.getUsersWithFilter(route.query);
  }
  userList.value = users;
}
onBeforeRouteUpdate(async (to, from) => {
  fetchUsers(to);
});
onMounted(() => {
  fetchUsers(route);
});
</script>
<style scoped lang="scss">
.body {
  max-width: 1100px;
}
.input-wrapper {
  position: relative;
  display: flex;
  gap: 40px;
  border: 1px solid #000;
  border-radius: 15px;
  max-width: 895px;
  margin: 0px auto;
  min-height: 67px;
  margin-bottom: 105px;
  span {
    display: inline-block;
    width: 1px;
    height: 43px;
    transform: translateY(25%);
    background-color: #000;
  }
}
.input-block {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
}
.actions-block {
  display: flex;
}
.btn-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  padding: 0px 35px;
  img {
    max-width: 35px;
    max-height: 35px;
  }
}
.input {
  flex: 1 1 auto;
  height: 100%;
}
.input-field {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1 1 auto;
  input {
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
}
.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  margin-bottom: 62px;
}
.user-list {
  display: grid;
  gap: 10px;
}
</style>
