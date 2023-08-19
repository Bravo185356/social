<template>
  <select-avatar
    @change-avatar-visible="selectAvatarVisible = !selectAvatarVisible"
    :selectAvatarVisible="selectAvatarVisible"
    @update-avatar="updateAvatar"
  />
  <div class="profile-header">
    <div>
      <div class="avatar">
        <img :src="getImageUrl(user.img)" alt="Аватар" />
      </div>
      <div v-if="user.id !== userStore.getUser.id">
        <v-btn v-if="user.friend_status === 0">Отменить запрос</v-btn>
        <v-btn v-else-if="user.friend_status === 1">Удалить из друзей</v-btn>
        <v-btn v-else @click="sendFriendRequest">Добавить в друзья</v-btn>
      </div>
      <v-btn v-if="route.params.id == userStore.getUser.id" @click="selectAvatarVisible = true">Сменить аватар</v-btn>
    </div>
    <div class="info">
      <div class="name">{{ user.name }} {{ user.surname }}</div>
      <div v-if="user.status" class="status">Online</div>
      <div class="city">Город {{ user.city }}</div>
    </div>
    <div>
      <div class="last-visit">
        <span>Последний раз был в сети</span>
        <span>{{ FormatDate(user.last_visit) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import AvatarApi from "@/Service/API/avatar.ts";
import SelectAvatar from "@/components/SelectAvatar.vue";
import FriendApi from "@/Service/API/friends.ts";
import { FormatDate } from "@/helpers/FormatDate.ts";
import UserApi from "../API/user";

const props = defineProps({
  user: Object,
});

const userStore = useUserStore();
const route = useRoute();

const user = ref(props.user);
const selectAvatarVisible = ref(false);

async function sendFriendRequest() {
  await FriendApi.addFriend(userStore.getUser.id, route.params.id);
}
function updateAvatar(img) {
  user.value.img = img;
  userStore.changeField("img", img);
}
onBeforeRouteUpdate(async (to, from) => {
  user.value = await UserApi.getUserInfo(to.params.id, userStore.getUser.id);
});
</script>
<style scoped>
.profile-header {
  display: flex;
  padding: 20px;
  background-color: rgb(224, 226, 255);
  border-radius: 10px;
  gap: 20px;
}
.info {
  display: grid;
  align-self: start;
  flex: 1 1 auto;
}
.name {
  font-size: 20px;
}
.avatar-form {
  display: grid;
  gap: 20px;
}
.avatar {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.last-visit {
  display: grid;
  text-align: right;
}
</style>
../../../helpers/FormatDate@/Service/API/avatar
