<template>
  <header class="header">
    <router-link to="/" class="title">Social</router-link>
    <header-notifications v-if="userStore.isLogined" />
    <div v-if="userStore.isLogined" class="profile-link">
      <img @click.self="showDropMenu = !showDropMenu" :src="getImageUrl(userStore.getUser.img)" alt="Аватар" />
      <Transition>
        <div v-if="showDropMenu">
          <drop-menu @close-drop-menu="showDropMenu = false">
            <ul class="drop-menu">
              <li class="drop-menu-item">
                <router-link class="drop-menu-link" to="/profile">
                  <img src="../assets/icons/settings.svg" alt="setting icon" />Профиль
                </router-link>
              </li>
              <li class="drop-menu-item logout">
                <button class="logout-btn" @click="userStore.logout">
                  <img src="../assets/icons/akar-icons_door.svg" alt="exit icon" />Выйти
                </button>
              </li>
            </ul>
          </drop-menu>
        </div>
      </Transition>
    </div>
    <v-btn v-else><router-link to="/auth/login">Логин</router-link></v-btn>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import HeaderNotifications from "./HeaderNotifications.vue";
import { useUserStore } from "@/stores/user.ts";
import RequestApi from "@/Service/API/requests.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import { useWebsocketsStore } from "@/stores/websockets.ts";
import DropMenu from "./DropMenu.vue";

const router = useRouter();

const userStore = useUserStore();
const websocketsStore = useWebsocketsStore();

const showDropMenu = ref(false);
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
  background-color: #98fff4;
  border-bottom: 1px solid rgb(207, 207, 207);
  padding: 19px 15px;
  max-height: 60px;
  z-index: 101;
  gap: 30px;
}
.profile-link {
  position: relative;
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
  }
  .drop-menu {
    position: absolute;
    display: grid;
    gap: 20px;
    top: 120%;
    right: 0;
    width: auto;
    height: auto;
    background-color: white;
    padding: 20px 20px;
    box-shadow: 0px 0px 5px rgb(138, 138, 138);
    border-radius: 7px;
    .drop-menu-item {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }
  }
}
.logout-btn,
.drop-menu-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
}
.logout-btn {
  color: red;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  visibility: hidden;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  visibility: visible;
}
.profile-btn {
  position: relative;
}
.title {
  font-size: 32px;
}
</style>
