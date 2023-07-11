<template>
  <div class="user-wrapper body">
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
.user-wrapper {
  display: flex;
  justify-content: center;
}
.user-body {
  display: flex;
  flex-direction: column;
  flex: 0 1 1000px;
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
