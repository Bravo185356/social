<template>
  <div class="body">
    <v-btn @click="showFriends">Начать диалог</v-btn>
    <div v-if="showFriendList" class="friend-list">
      <ul>
        <li v-for="friend in friendList" :key="friend.id" class="friend-item">
          <router-link :to="{ path: `/messager/${getNewChatId(friend.id)}` }">{{ friend.name }} {{ friend.surname }}</router-link>
        </li>
      </ul>
    </div>
    <div>
      <div v-for="chat in chatList">
        <router-link :to="{ path: `/messager/${chat.user_id}/${chat.chat_id}` }">{{ chat.name }} {{ chat.surname }}</router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import FriendApi from "@/Service/API/friends.ts";
import { useUserStore } from "@/stores/user.ts";
import ChatApi from "../API/chat.ts";

const userStore = useUserStore();
const router = useRouter();

const showFriendList = ref(false);
const friendList = ref([]);
const chatList = ref([]);

function getNewChatId(id) {
  return Math.floor(Date.now() + Math.random());
}
async function showFriends() {
  showFriendList.value = !showFriendList.value;
}

onMounted(async () => {
  const response = await ChatApi.getAllChats(userStore.getUser.id);
  chatList.value = response;

  const friends = await FriendApi.getFriends(userStore.getUser.id);
  friendList.value = friends;
});
</script>
<style lang="scss"></style>
