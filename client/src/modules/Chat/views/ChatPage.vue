<template>
  <div class="body">
    <div v-if="!route.query.id">
      <v-btn @click="showFriends">Начать диалог</v-btn>
      <div v-if="showFriendList" class="friend-list">
        <ul>
          <li v-for="friend in filteredFriendList" :key="friend.id" class="friend-item">
            <div @click="redirectToChat(friend.id)">{{ friend.name }} {{ friend.surname }}</div>
          </li>
        </ul>
      </div>
      <div>
        <div v-for="chat in chatList">
          <div @click="redirectToChat(chat.user_id)">{{ chat.name }} {{ chat.surname }}</div>
        </div>
      </div>
    </div>
    <dialog-block @update-chats="updateChats" :chats="chatList" v-else />
  </div>
</template>
<script setup lang="ts">
import DialogBlock from "../components/DialogBlock.vue";
import { onMounted, ref, computed } from "vue";
import { useRouter, onBeforeRouteUpdate, useRoute } from "vue-router";
import FriendApi from "@/Service/API/friends.ts";
import { useUserStore } from "@/stores/user.ts";
import ChatApi from "../API/chat.ts";

const props = defineProps({
  chats: Array,
  friends: Array
})

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const showFriendList = ref(false);
const friendList = ref([]);
const chatList = ref(props.chats);

async function updateChats() {
  const chats = await ChatApi.getAllChats(userStore.getUser.id)
  chatList.value = chats
}
function getNewChatId(id) {
  return Math.floor(Date.now() + Math.random());
}
function redirectToChat(userId) {
  showFriendList.value = false
  router.push({ path: "/messager", query: { id: userId } });
}
async function showFriends() {
  showFriendList.value = !showFriendList.value;
}
const filteredFriendList = computed(() => {
  return props.friends.filter((friend) => !props.chats.find((chat) => chat.user_id == friend.id));
});
onBeforeRouteUpdate((to, from) => {
  to.params.chats = props.chats
  to.params.friends = props.friends
})
</script>
<style lang="scss"></style>
