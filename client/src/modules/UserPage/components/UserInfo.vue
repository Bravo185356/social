<template>
  <select-avatar
    @change-avatar-visible="selectAvatarVisible = !selectAvatarVisible"
    :selectAvatarVisible="selectAvatarVisible"
    @upload-avatar="(file) => $emit('uploadAvatar', file)"
  />
  <div class="profile-header">
    <div>
      <div class="avatar">
        <img :src="getImageUrl(props.user.img)" alt="Аватар" />
      </div>
      <v-btn v-if="route.params.id == userStore.getUser.id" @click="selectAvatarVisible = true">Сменить аватар</v-btn>
    </div>
    <div class="info">
      <div class="name">{{ props.user.name }} {{ props.user.surname }}</div>
      <div class="status">status</div>
      <div class="city">Город {{ props.user.city }}</div>
    </div>
    <div v-if="user.id !== userStore.getUser.id">
      <v-btn v-if="user.status === 0">Отменить запрос</v-btn>
      <v-btn v-else-if="user.status === 1">Удалить из друзей</v-btn>
      <v-btn v-else @click="$emit('sendRequest')">Добавить в друзья</v-btn>
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

const emits = defineEmits(["sendRequest", "uploadAvatar"]);

const props = defineProps({
  user: Object,
});

const userStore = useUserStore();
const route = useRoute();

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
</style>
