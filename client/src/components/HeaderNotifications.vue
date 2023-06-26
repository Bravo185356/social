<template>
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
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.ts";
import RequestApi from "@/Service/API/requests.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const notifications = ref([]);

const userStore = useUserStore();

async function acceptRequest(requestId) {
  RequestApi.acceptRequest(userStore.getUser.id, requestId);
}
async function rejectRequest(requestId) {
  RequestApi.rejectRequest(requestId);
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  const notificationsList = await RequestApi.getRequests(token);
  notifications.value = notificationsList;
});
</script>
<style scoped>
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
