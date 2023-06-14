<template>
  <v-dialog max-width="500px" v-model="changeAvatarModal">
    <v-card>
      <v-card-title>Выберите изображение</v-card-title>
      <div class="change-avatar-modal">
        <form class="avatar-form" @submit.prevent="$emit('changeAvatar', file)">
          <input name="avatar" @change="setFile" type="file" />
          <v-btn type="submit">Изменить</v-btn>
        </form>
      </div>
    </v-card>
  </v-dialog>
  <div class="profile-header">
    <div>
      <div class="avatar">
        <img :src="getImageUrl(props.user.img)" alt="Аватар" />
      </div>
      <v-btn v-if="route.params.id == userStore.getUser.id" @click="changeAvatarModal = true">Сменить аватар</v-btn>
    </div>
    <div class="info">
      <div class="name">{{ props.user.name }} {{ props.user.surname }}</div>
      <div class="status">status</div>
      <div class="city">Город {{ props.user.city }}</div>
    </div>
    <div v-if="user.id !== userStore.getUser.id">
      <v-btn v-if="user.status === 0" >Отменить запрос</v-btn>
      <v-btn v-else-if="user.status === 1">Удалить из друзей</v-btn>
      <v-btn v-else @click="$emit('sendRequest')">Добавить в друзья</v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRoute } from "vue-router";
import { getImageUrl } from "@/helpers/getImageUrl.ts";

const emits = defineEmits(["changeAvatar", "sendRequest"]);

const props = defineProps({
  user: Object,
});

const userStore = useUserStore();
const route = useRoute();

const changeAvatarModal = ref(false);
const file = ref(null);

function setFile(e) {
  file.value = e.target.files[0];
}
</script>
<style scoped>
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
</style>
