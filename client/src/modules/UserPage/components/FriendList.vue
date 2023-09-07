<template lang="">
  <div class="friends">
    <ul class="friend-list">
      <li :key="friend.id" v-for="friend in friends" class="friend-item">
        <div class="friend-avatar">
          <img :src="getImageUrl(friend.img)" alt="аватар" />
          <div class="status">
            <online-indicator :w="16" :h="16" :onlineStatus="friend.status" />
          </div>
        </div>
        <div class="friend-info">
          <router-link :to="{ path: `/${friend.id}` }">{{ friend.name }} {{ friend.surname }}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import { onBeforeRouteUpdate } from "vue-router";
import FriendApi from "@/Service/API/friends.ts";
import OnlineIndicator from '@/UI/OnlineIndicator.vue'

const props = defineProps({
  friends: Array,
});

const friends = ref(props.friends);

onBeforeRouteUpdate(async (to, from) => {
  friends.value = await FriendApi.getFriends(to.params.id);
});
</script>
<style scoped>
.friend-list {
  display: grid;
  gap: 10px;
}
.friend-item {
  display: flex;
  align-items: center;
  background-color: rgb(224, 226, 255);
  padding: 7px;
  border-radius: 5px;
  gap: 10px;
  box-shadow: 0px 0px 2px rgb(124, 124, 124);
}
.friend-avatar {
  position: relative;
  width: 50px;
  height: 50px;

  & > img {
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.status {
  position: absolute;
  bottom: -6px;
  right: -6px;
}
</style>
