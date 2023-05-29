<template>
  <div class="user-item">
    <div class="user-body">
      <div class="user-image">
        <img :src="getImageUrl(user.img)" alt="Аватар" />
      </div>
      <div class="user-info">
        <div>id: {{ user.id }}</div>
        <router-link :to="{ path: `/${user.id}` }">{{ user.name }} {{ user.surname }}</router-link>
        <div>Город: {{ user.city }}</div>
      </div>
    </div>
    <v-btn @click="addFriend(user)" v-if="user.id !== userStore.getUser.id && !isMyFriend">Добавить в друзья</v-btn>
  </div>
</template>
<script setup lang="ts">
import { computed, defineProps, watch } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.ts";
import { useFriendStore } from "@/stores/friends.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const props = defineProps({
  user: { type: Object },
});
const userStore = useUserStore();
const friendStore = useFriendStore();

async function addFriend(user) {
  const response = await fetch("http://localhost:8080/api/add-friend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user,
      id: userStore.getUser.id,
    }),
  });
  const data = await response.json()
  friendStore.addUserToFriendList(data);
}

const isMyFriend = computed(() => {
  if (friendStore.getFriendList.length) {
    return friendStore.getFriendList.find((friend) => friend.id === props.user.id);
  }
});
</script>
<style>
.user-body {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}
.user-item {
  align-items: center;
  gap: 10px;
  background-color: rgb(207, 207, 207);
  padding: 20px;
  border-radius: 10px;
}
.user-image {
  position: relative;
  background-color: gray;
  width: 60px;
  height: 60px;
}
.user-image img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
