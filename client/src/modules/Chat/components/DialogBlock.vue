<template>
  <div class="chat-title">Диалог с {{ titleMessage }}</div>
  <div class="chat">
    <div class="message" v-for="message in chatMessages" :key="message.message_id">
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
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import { useWebsocketsStore } from "@/stores/websockets.ts";
import ChatApi from "../API/chat.ts";

const emit = defineEmits(["updateChats"]);
const props = defineProps({
  chats: Array,
  friends: Array,
});

const textMessage = ref("");
const chatMessages = ref([]);
const users = ref([]);
const userInfo = ref({});

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
    chatId: Number(checkForChatExisting.value.chat_id),
    myId: userStore.getUser.id,
    content: textMessage.value,
    isFirstMessage: isFirstMessage.value,
  };
  if (isFirstMessage.value) {
    body.userId = Number(route.query.id);
  }
  websocketStore.getWsChat.send(JSON.stringify(body));
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
const checkForChatExisting = computed(() => {
  return props.chats.find((chat) => chat.user_id == route.query.id);
});

onMounted(async () => {
  websocketStore.getWsChat.onmessage = (e) => {
    const message = JSON.parse(e.data);
    chatMessages.value.push(message.message);
  };
  const usersInfo = await ChatApi.getUsersInfo(Number(route.query.id), userStore.getUser.id);
  users.value.push(...usersInfo);
  if (checkForChatExisting.value) {
    const messages = await ChatApi.getAllMessages(checkForChatExisting.value.chat_id);
    chatMessages.value = messages;
  }
});
</script>
<style scoped lang="scss">
.chat {
  display: grid;
  gap: 20px;
  max-width: 981px;
  padding-bottom: 150px;
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
}
.input-block {
  position: fixed;
  padding: 10px;
  width: 981px;
  bottom: 0;
  background-color: rgb(177, 177, 252);
}
</style>
