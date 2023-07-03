<template>
  <v-dialog max-width="500px" v-model="avatarVisible">
    <v-card>
      <v-card-title>Выберите изображение</v-card-title>
      <div class="change-avatar-modal">
        <form class="avatar-form" @submit.prevent="$emit('uploadAvatar', file)">
          <input name="avatar" @change="setFile" type="file" />
          <v-btn type="submit">Изменить</v-btn>
        </form>
        <form>
          <div class="select">
            <div class="select-row">
              <div v-for="img in recentImages">
                <label class="select-item" @click="selectAvatar(img.img)" :for="img.img">
                  <img class="image_small" :src="getImageUrl(img.img)" alt="" />
                </label>
                <input type="radio" class="opt" :id="img.img" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, defineEmits, ref, onMounted } from "vue";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import { useUserStore } from "@/stores/user.ts";
import AvatarApi from "@/modules/UserPage/API/avatar.ts";

const emit = defineEmits(["changeAvatarVisible", 'uploadAvatar']);

const props = defineProps({
  selectAvatarVisible: Boolean,
});
const userStore = useUserStore();

const file = ref(null);
const recentImages = ref([]);

function setFile(e) {
  file.value = e.target.files[0];
}
async function selectAvatar(img) {
  const image = await AvatarApi.selectFromRecentAvatars(userStore.getUser.id, img);
}

const avatarVisible = computed({
  get() {
    return props.selectAvatarVisible;
  },
  set(newValue) {
    emit("changeAvatarVisible", newValue);
  },
});
onMounted(async () => {
  const images = await AvatarApi.getRecentAvatars(userStore.getUser.id, userStore.getUser.img);
  recentImages.value = images;
});
</script>
<style>
.change-avatar-modal {
  padding: 20px;
}
.select {
  width: 100%;
  margin-top: 20px;
}
.select-row {
  display: flex;
}
.select-item {
  display: block;
  position: relative;
  width: 150px;
  height: 150px;
}
.image_small {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.avatar-form {
  display: grid;
  gap: 20px;
}
</style>
