<template>
  <header class="header">
    <router-link to="/" class="title">Social</router-link>
    <div class="notifications">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon size="large" v-bind="props" color="blue-darken-2" icon="mdi-bell"></v-icon>
        </template>
        <v-list v-if="notifications.length">
          <v-list-item v-for="notification in notifications" :key="notification.id">
            <v-list-item-title>
              <div><img class="notification-img" :src="getImageUrl(notification.img)" alt="" /></div>
              <div>{{ notification.name }} хочет добавить вас в друзья</div>
              <div class="controls">
                <v-btn @click="acceptRequest(notification.id)">Принять</v-btn>
                <v-btn @click="rejectRequest(notification.id)">Отклонить</v-btn>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <div>У вас нет уведомлений</div>
        </v-list>
      </v-menu>
    </div>
    <router-link :to="{ path: store.isLogined ? '/profile' : '/auth/login' }"
    ><v-btn :variant="buttonType">{{ buttonText }}</v-btn></router-link
    >
    
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user.ts";
import RequestApi from "@/Service/API/requests.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const props = defineProps({
  notifications: { type: Array },
});

const store = useUserStore();

const buttonText = computed(() => (store.isLogined ? store.getUser.name : "Логин"));
const buttonType = computed(() => (store.isLogined ? "text" : "elevated"));

async function acceptRequest(id) {
  RequestApi.acceptRequest(store.getUser.id, id);
}
async function rejectRequest(id) {
  RequestApi.rejectRequest(id);
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid rgb(207, 207, 207);
  padding: 10px;
  max-height: 60px;
  z-index: 101;
  gap: 30px;
}
.title {
  font-size: 32px;
}
.v-list {
  padding: 10px;
}
.notifications {
  text-align: right;
  flex: 1 1 auto;
}
.notification-img {
  max-width: 40px;
  max-height: 40px;
}
.controls {
  display: flex;
  gap: 5px;
  padding: 5px;
}
.v-list {
  margin-top: 5px;
}
</style>
