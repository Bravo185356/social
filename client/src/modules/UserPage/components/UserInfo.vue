<template>
  <select-avatar
    @change-avatar-visible="selectAvatarVisible = !selectAvatarVisible"
    :selectAvatarVisible="selectAvatarVisible"
    @update-avatar="updateAvatar"
  />
  <div class="profile-header">
    <div class="profile-header__row">
      <div class="avatar">
        <img :src="getImageUrl(user.img)" alt="Аватар" />
      </div>
      <div class="info">
        <div class="name">{{ user.name }} {{ user.surname }}</div>
        <div class="city">Город {{ user.city }}</div>
      </div>
      <div class="last-visit">
        <div class="status">
          <online-indicator :onlineStatus="user.status" /><span>{{ user.status ? "Онлайн" : "Офлайн" }}</span>
        </div>
        <div>Последний раз был в сети</div>
        <div>{{ FormatDate(user.last_visit) }}</div>
      </div>
    </div>
    <div class="profile-header__button">
      <blue-button v-if="user.friend_status === 0">Отменить запрос</blue-button>
      <blue-button v-else-if="user.friend_status === 1">Удалить из друзей</blue-button>
      <blue-button v-else-if="user.id === userStore.getUser.id">
        <img src="../../../assets/icons/edit.svg" />Редактировать профиль
      </blue-button>
      <blue-button v-else @click="sendFriendRequest">Добавить в друзья</blue-button>
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
import OnlineIndicator from "@/UI/OnlineIndicator.vue";
import UserApi from "../API/user";
import BlueButton from '@/UI/BlueButton.vue'

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
  padding: 28px 40px 35px 40px;
  background-color: white;
  border-radius: 15px;
  font-size: 20px;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "Montserrat", sans-serif;
}
.profile-header__row {
  display: flex;
  margin-bottom: 16px;
  gap: 70px;
}
.profile-header__button {
  display: flex;
  justify-content: end;
}
.info {
  display: grid;
  align-self: start;
  flex: 1 1 auto;
  row-gap: 30px;
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
  width: 258px;
  height: 258px;
  margin-bottom: 10px;
  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.status {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
  margin-bottom: 10px;
}
.last-visit {
  text-align: right;
}
</style>
