<template>
  <div class="main-page">
    <user-info @send-request="sendFriendRequest" @change-avatar="changeAvatar" :user="user" />
    <div class="profile-body">
      <friend-list :friends="friends" />
      <post-list @delete-post="deletePost" @create-post="createPost" :posts="posts" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch, defineProps } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useUserStore } from "@/stores/user.ts";
import PostList from "../components/PostList/PostList.vue";
import PostsApi from "../API/posts.ts";
import { getImageUrl } from "@/helpers/getImageUrl.ts";
import AvatarApi from "@/modules/UserPage/API/avatar";
import UserApi from "@/Service/API/users.ts";
import FriendApi from "@/Service/API/friends.ts";
import { useIsLoading } from "@/stores/isLoading";
import { fetchUserInfo } from "../router.ts";
import FriendList from "../components/FriendList/FriendList.vue";
import UserInfo from "../components/UserInfo/UserInfo.vue";

const props = defineProps({
  user: Object,
  friends: Array,
  posts: Array,
});

const userStore = useUserStore();
const isLoadingStore = useIsLoading();
const route = useRoute();

const user = ref(props.user);
const friends = ref(props.friends);
const posts = ref(props.posts);

const changeAvatarModal = ref(false);

async function createPost(text) {
  const body = {
    content: text,
    userId: route.params.id,
  };
  const newPost = await PostsApi.createPost(body);
  posts.value = [...posts.value, newPost];
}
function deletePost(id) {
  PostsApi.deletePost(id);
  posts.value = posts.value.filter((post) => post.id !== id);
}
async function changeAvatar(file) {
  const formData = new FormData();

  formData.append("avatar", file);
  formData.append("id", route.params.id);

  user.value.img = await AvatarApi.updateAvatar(formData);
}
onBeforeRouteUpdate(async (to, from) => {
  const [userInfo, friendList, postsList] = await fetchUserInfo(to.params.id);
  user.value = userInfo;
  friends.value = friendList;
  posts.value = postsList;
});
async function sendFriendRequest() {
  await FriendApi.addFriend(userStore.getUser.id, route.params.id);
}
</script>
<style scoped lang="scss">
.main-page {
  padding: 10px;
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
</style>
