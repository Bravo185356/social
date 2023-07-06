<template>
  <select-avatar
    @change-avatar-visible="selectAvatarVisible = !selectAvatarVisible"
    :selectAvatarVisible="selectAvatarVisible"
    @update-avatar="(img) => $emit('updateAvatar', img)"
  />
  <div class="profile-header">
    <div>
      <div class="avatar">
        <img :src="getImageUrl(props.user.img)" alt="Аватар" />
      </div>
      <div v-if="user.id !== userStore.getUser.id">
        <v-btn v-if="user.status === 0">Отменить запрос</v-btn>
        <v-btn v-else-if="user.status === 1">Удалить из друзей</v-btn>
        <v-btn v-else @click="sendFriendRequest">Добавить в друзья</v-btn>
      </div>
      <v-btn v-if="route.params.id == userStore.getUser.id" @click="selectAvatarVisible = true">Сменить аватар</v-btn>
    </div>
    <div class="info">
      <div class="name">{{ props.user.name }} {{ props.user.surname }}</div>
      <div class="status">status</div>
      <div class="city">Город {{ props.user.city }}</div>
    </div>
    <div>
      <div class="last-visit">
        <span>Последний раз был в сети</span>
        <span>{{ FormatDate(props.user.last_visit) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits, onMounted } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRoute } from "vue-router";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import AvatarApi from "@/modules/UserPage/API/avatar.ts";
import SelectAvatar from "./SelectAvatar.vue";
import FriendApi from "@/Service/API/friends.ts";
import { FormatDate } from "../helpers/FormatDate.ts";

const emits = defineEmits(["updateAvatar"]);

const props = defineProps({
  user: Object,
});

const userStore = useUserStore();
const route = useRoute();

async function sendFriendRequest() {
  await FriendApi.addFriend(userStore.getUser.id, route.params.id);
}

const selectAvatarVisible = ref(false);
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
