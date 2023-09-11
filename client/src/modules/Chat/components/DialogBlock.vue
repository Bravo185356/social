<template>
  <div v-if="users.length">
    <div class="chat-title">Диалог с {{ titleMessage }}</div>
    <div class="chat">
      <div class="message" v-for="message in chatMessages" :key="message.message_id">
        <img :src="getImageUrl(getUserInfo(message.user_id).img)" />
        <router-link :to="{ path: `/${message.user_id}` }" class="message-sender">
          {{ getUserInfo(message.user_id).name }} {{ getUserInfo(message.user_id).surname }}
        </router-link>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="input-block">
      <v-textarea no-resize rows="2" v-model="textMessage"></v-textarea>
      <v-btn @click="sendMessage">Отправить</v-btn>
    </div>
  </div>
  <div v-else>Не удалось найти пользователя</div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import { useWebsocketsStore } from "@/stores/websockets.ts";
import ChatApi from "../API/chat.ts";
import { getImageUrl } from '@/helpers/getImageUrl.ts'

const emit = defineEmits(["updateChats"]);
const props = defineProps({
  friends: Array,
  chatItem: Object
});

const textMessage = ref("");
const chatMessages = ref([]);
const users = ref([]);

const route = useRoute();
const userStore = useUserStore();
const websocketStore = useWebsocketsStore();

function getNewChatId(id) {
  return Math.floor(Date.now() + Math.random());
}
function getUserInfo(id) {
  return users.value.find((user) => user.user_id == id);
}
async function sendMessage() {
  let body = {
    type: "newMessage",
    chatId: Number(checkForChatExisting(route.query.id).chat_id),
    myId: userStore.getUser.id,
    userId: Number(route.query.id),
    content: textMessage.value,
    isFirstMessage: isFirstMessage.value,
  };
  websocketStore.getWebsockets.chat.send(JSON.stringify(body));
  if (isFirstMessage.value) {
    emit("updateChats");
  }
  textMessage.value = "";
}
const isFirstMessage = computed(() => {
  return chatMessages.value.length ? false : true;
});
const titleMessage = computed(() => {
  if (users.value.length) {
    const filteredUsers = users.value.filter((user) => user.user_id !== userStore.getUser.id);
    return filteredUsers.length > 1 ? "Групповой чат" : `${filteredUsers[0].name} ${filteredUsers[0].surname}`;
  }
});
async function getChatInfo(otherUserId) {
  const usersInfo = await ChatApi.getUsersInfo(Number(otherUserId), userStore.getUser.id);
  users.value = usersInfo;
  if (props.chatItem) {
    const messages = await ChatApi.getAllMessages(Number(props.chatItem.chat_id));
    chatMessages.value = messages;
  }
}
onBeforeRouteUpdate(async (to, from) => {
  if (to.query.id) {
    getChatInfo(to.query.id)
  }
});
onMounted(async () => {
  websocketStore.getWebsockets.chat.onmessage = (e) => {
    const message = JSON.parse(e.data);
    chatMessages.value.push(message.message);
  };
  getChatInfo(route.query.id)
});
</script>
<style scoped lang="scss">
.chat {
  display: grid;
  gap: 20px;
  max-width: 981px;
  padding: 0px 20px 150px 20px;
}
.chat-title {
  padding-top: 60px;
  background-color: white;
  text-align: center;
  font-size: 22px;
  width: 981px;
  margin-bottom: 20px;
}
.message {
  display: grid;
  gap: 10px;
  padding: 10px;
  border-radius: 7px;
  background-color: rgb(225, 225, 255);
  & img {
    max-width: 60px;
    max-height: 60px;
    border-radius: 50%;
  }
}
.input-block {
  position: fixed;
  padding: 10px;
  width: 981px;
  bottom: 0;
}
</style>
