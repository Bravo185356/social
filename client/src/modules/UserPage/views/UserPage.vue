<template>
  <div class="main-page">
    <v-dialog v-model="changeAvatarModal">
      <v-card width="500px">
        <v-card-title>Выберите изображение</v-card-title>
        <div class="change-avatar-modal">
          <form class="avatar-form" @submit.prevent="updateAvatar">
            <input name="avatar" @change="setFile" type="file" />
            <v-btn type="submit">Изменить</v-btn>
          </form>
        </div>
      </v-card>
    </v-dialog>
    <div class="profile-header">
      <div>
        <div class="avatar">
          <img :src="getImageUrl(user.img)" alt="Аватар" />
        </div>
        <v-btn v-if="route.params.id == userStore.getUser.id" @click="changeAvatarModal = true">Сменить аватар</v-btn>
      </div>
      <div class="info">
        <div class="name">{{ user.name }} {{ user.surname }}</div>
        <div class="status">status</div>
        <div class="city">Город {{ user.city }}</div>
      </div>
      <div>
        <v-btn v-if="userStore.getUser.id !== user.id && !isMyFriend" @click="sendFriendRequest">Добавить в друзья</v-btn>
      </div>
    </div>
    <div class="profile-body">
      <div class="friends">
        <ul class="friend-list">
          <li :key="friend.id" v-for="friend in friends" class="friend-item">
            <div class="friend-avatar">
              <img :src="getImageUrl(friend.img)" alt="" />
            </div>
            <div class="friend-info">
              <router-link :to="{ path: `/${friend.id}` }">{{ friend.name }} {{ friend.surname }}</router-link>
            </div>
          </li>
        </ul>
      </div>
      <post-list />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineProps } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import PostList from "../components/PostList.vue";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import AvatarApi from "@/modules/UserPage/API/avatar";
import UserApi from "@/Service/API/users.ts";
import FriendApi from "@/Service/API/friends.ts";
import { useIsLoading } from "@/stores/isLoading";
import { fetchUserInfo } from "../router.ts";

const props = defineProps({
  user: Object,
  friends: Array,
});

const userStore = useUserStore();
const isLoadingStore = useIsLoading();
const route = useRoute();

const user = ref(props.user);
const friends = ref(props.friends);
const file = ref<File | Blob | null>(null);
const changeAvatarModal = ref(false);

function setFile(e) {
  file.value = e.target.files[0];
}
async function updateAvatar() {
  const formData = new FormData();

  formData.append("avatar", file.value);
  formData.append("id", route.params.id);

  user.value.img = await AvatarApi.updateAvatar(formData);
}
onBeforeRouteUpdate(async (to, from) => {
  const [userInfo, friendList] = await fetchUserInfo(to.params.id)
  user.value = userInfo
  friends.value = friendList
});
async function sendFriendRequest() {
  await FriendApi.addFriend(userStore.getUser.id, route.params.id);
}
const isMyFriend = computed(() => {
  return friends.value.find((friend) => friend.id === userStore.getUser.id);
});
</script>

<style lang="scss">
.main-page {
  padding: 10px;
}
.change-avatar-modal {
  padding: 20px;
}
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
.profile-body {
  display: grid;
  column-gap: 20px;
  border-top: 1px solid gray;
  padding-top: 10px;
  margin-top: 30px;
  grid-template: 1fr / minmax(100px, 200px) 1fr;
}
.v-overlay__content {
  width: auto;
  align-items: center;
}
.friend-list {
  display: grid;
  gap: 10px;
}
.friend-item {
  display: flex;
  align-items: center;
  background-color: rgb(224, 226, 255);
  padding: 7px;
  border-radius: 5px;
  gap: 10px;
  box-shadow: 0px 0px 2px rgb(124, 124, 124);
}
.friend-avatar {
  position: relative;
  width: 50px;
  height: 50px;

  & > img {
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
