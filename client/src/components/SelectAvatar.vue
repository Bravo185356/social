<template>
  <v-dialog max-width="500px" v-model="avatarModalVisible">
    <v-card>
      <v-card-title>Выберите изображение</v-card-title>
      <div class="change-avatar-modal">
        <div class="avatar-form">
          <input name="avatar" @change="setFile" type="file" />
        </div>
        <div class="select">
          <div class="select-row">
            <div class="select-item" v-for="img in recentImages">
              <label class="select-image" @click="selectAvatarFromRecent(img.img)" :for="img.img">
                <img class="image_small" :src="getImageUrl(img.img)" alt="" />
              </label>
              <input type="radio" class="opt" :id="img.img" />
            </div>
          </div>
        </div>
        <v-btn @click="uploadAvatar">Изменить</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, defineEmits, ref, onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import { useUserStore } from "@/stores/user.ts";
import AvatarApi from "@/Service/API/avatar.ts";

const emit = defineEmits(["changeAvatarVisible", "updateAvatar"]);

const props = defineProps({
  selectAvatarVisible: Boolean,
});

const userStore = useUserStore();
const route = useRoute();

const file = ref(null);
const recentImages = ref([]);

function setFile(e) {
  file.value = e.target.files[0];
}
async function selectAvatarFromRecent(img) {
  const image = await AvatarApi.selectFromRecentAvatars(userStore.getUser.id, img);
}
async function uploadAvatar() {
  if (file.value) {
    const formData = new FormData();

    formData.append("avatar", file.value);
    formData.append("id", userStore.getUser.id);

    const response = await AvatarApi.updateAvatar(formData);
    recentImages.value = response.recent;

    emit("updateAvatar", response.img);
    emit("changeAvatarVisible");
  }
}
const avatarModalVisible = computed({
  get() {
    return props.selectAvatarVisible;
  },
  set() {
    emit("changeAvatarVisible");
  },
});
onUpdated(async () => {
  if(props.selectAvatarVisible) {
    const images = await AvatarApi.getRecentAvatars(userStore.getUser.id);
    recentImages.value = images;
  }
})
</script>
<style scoped>
.v-btn {
  width: 100%;
}
.change-avatar-modal {
  padding: 20px;
}
.select {
  width: 100%;
  margin-top: 20px;
}
.select-row {
  display: flex;
  column-gap: 10px;
  margin-bottom: 10px;
}
.select-item {
  display: grid;
  justify-content: center;
  row-gap: 10px;
}
.select-image {
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
@/Service/API/avatar
