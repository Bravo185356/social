<template>
  <div class="body">
    <div class="chats-block">
      <div class="chats-header">
        <div class="title">Сообщения</div>
        <div class="write-friend" @click="showFriends"><img src="../../../assets/icons/jam_write-f.svg" alt="edit icon"></div>
      </div>
      <div v-if="showFriendList" class="friend-list">
        <ul>
          <li v-for="friend in filteredFriendList" :key="friend.id" class="friend-item">
            <div @click="redirectToChat(friend.id)">{{ friend.name }} {{ friend.surname }}</div>
          </li>
        </ul>
      </div>
      <div class="chat-list">
        <div v-for="chat in chatList" :key="chat.chat_id" class="chat-item" :class="{ active: route.query.id == chat.user_id }" @click="redirectToChat(chat.user_id, chat.chat_id)">
          <img :src="getImageUrl(chat.img)" alt="" />
          {{ chat.name }} {{ chat.surname }}
        </div>
      </div>
    </div>
    <dialog-block :chatItem="chatItem" @update-chats="updateChats" v-if="route.query.id" />
  </div>
</template>
<script setup lang="ts">
import DialogBlock from "../components/DialogBlock.vue";
import { onMounted, ref, computed } from "vue";
import { useRouter, onBeforeRouteUpdate, useRoute } from "vue-router";
import FriendApi from "@/Service/API/friends.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import { useUserStore } from "@/stores/user.ts";
import ChatApi from "../API/chat.ts";

const props = defineProps({
  chats: Array,
  friends: Array,
});

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const showFriendList = ref(false);
const showChat = ref(false);
const friendList = ref([]);
const chatList = ref(props.chats);

async function updateChats() {
  const chats = await ChatApi.getAllChats(userStore.getUser.id);
  chatList.value = chats;
}
function getNewChatId(id) {
  return Math.floor(Date.now() + Math.random());
}
function redirectToChat(userId, chatId) {
  showChat.value = true;
  showFriendList.value = false;
  router.push({ path: "/messager", query: { id: userId } });
}
async function showFriends() {
  showFriendList.value = !showFriendList.value;
}
const chatItem = computed(() => {
  return chatList.value.find(chat => chat.user_id == route.query.id)
})
const filteredFriendList = computed(() => {
  return props.friends.filter((friend) => !props.chats.find((chat) => chat.user_id == friend.id));
});
onBeforeRouteUpdate((to, from) => {
  to.params.chats = props.chats;
  to.params.friends = props.friends;
});
</script>
<style scoped lang="scss">
.body {
  display: flex;
  padding: 0;
  max-height: calc(100vh - 60px);
}
.chats-block {
  flex: 0 1 400px;
  border-right: 2px solid #C7C3C3;
}
.chat-list {
  overflow-y: auto;
  max-height: calc(100vh - 60px - 98px);
}
.chats-header {
  display: flex;
  padding: 31px 9px;
  align-items: center;
  justify-content: space-between;
  & .title {
    font-size: 24px;
    font-weight: 700;
  }
}
.chat-item {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 20px 34px;
  cursor: pointer;
  & img {
    max-width: 60px;
    max-height: 60px;
    border-radius: 50%;
  }
  &:hover,
  &.active {
    background-color: #fff171;
  }
}
.write-friend {
  display: flex;
  justify-content: end;
  cursor: pointer;
}
</style>
