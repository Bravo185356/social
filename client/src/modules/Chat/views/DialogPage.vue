<template>
  <div class="body">
    <div class="chat-title">Диалог с {{ titleMessage }}</div>
    <div class="chat">
      <div class="message" v-for="message in chatMessages" :key="message.message_id">
        <router-link :to="{ path: `/${message.user_id}` }" class="message-sender">
          {{ userInfo(message.user_id).name }} {{ userInfo(message.user_id).surname }}
        </router-link>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="input-block">
      <v-textarea no-resize rows="2" v-model="textMessage"></v-textarea>
      <v-btn @click="sendMessage">Отправить</v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import { useWebsocketsStore } from "@/stores/websockets.ts";
import ChatApi from "../API/chat.ts";

const textMessage = ref("");
const chatMessages = ref([]);
const users = ref([]);

const route = useRoute();
const userStore = useUserStore();
const websocketStore = useWebsocketsStore();

const isFirstMessage = computed(() => {
  return chatMessages.value.length ? false : true;
});
const titleMessage = computed(() => {
  if (users.value.length) {
    const filteredUsers = users.value.filter((user) => user.user_id !== userStore.getUser.id);
    return filteredUsers.length > 1 ? "Групповой чат" : `${filteredUsers[0].name} ${filteredUsers[0].surname}`;
  }
});
function userInfo(id) {
  return users.value.find((user) => user.user_id == id);
}

async function sendMessage() {
  let body;
  if (isFirstMessage) {
    body = {
      type: "newMessage",
      chatId: Number(route.params.chatId),
      myId: userStore.getUser.id,
      userId: Number(route.params.id),
      content: textMessage.value,
      isFirstMessage: isFirstMessage.value,
    };
  } else {
    body = {
      type: "newMessage",
      chatId: Number(route.params.chatId),
      myId: userStore.getUser.id,
      content: textMessage.value,
      isFirstMessage: isFirstMessage.value,
    };
  }
  websocketStore.getWsChat.send(JSON.stringify(body));
  textMessage.value = "";
}

onMounted(async () => {
  websocketStore.getWsChat.onmessage = (e) => {
    const message = JSON.parse(e.data);
    chatMessages.value.push(message.message);
  };
  const userList = await ChatApi.getUsersInChat(route.params.chatId);
  users.value = userList;
  const messages = await ChatApi.getAllMessages(route.params.chatId);
  chatMessages.value = messages;
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
  position: fixed;
  top: 0;
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
