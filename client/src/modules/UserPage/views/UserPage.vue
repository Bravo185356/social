<template>
  <div class="user-info-body body">
    <div class="user-body">
      <user-info :user="props.user" />
      <div class="profile-body">
        <friend-list :friends="props.friends" />
        <post-list :posts="props.posts" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PostList from "../components/PostList.vue";
import FriendList from "../components/FriendList.vue";
import UserInfo from "../components/UserInfo.vue";

const props = defineProps({
  user: Object,
  friends: Array,
  posts: Array,
});
</script>
<style scoped lang="scss">
.body {
  flex: 0 1 1325px;
}
.user-body {
  display: flex;
  flex-direction: column;
}
.profile-body {
  display: grid;
  column-gap: 20px;
  margin-top: 25px;
  grid-template: 1fr / minmax(200px, 340px) 1fr;
  gap: 69px;
}
.v-overlay__content {
  width: auto;
  align-items: center;
}
</style>
