<template>
  <div class="my-posts">
    <div class="create-post">
      <v-btn @click="createPostVisible = true">Создать пост</v-btn>
      <v-form v-if="createPostVisible" class="post-form">
        <v-textarea label="Текст" v-model="postText"></v-textarea>
        <v-btn @click="$emit('createPost', postText)">Добавить</v-btn>
      </v-form>
    </div>
    <div class="post-list">
      <div v-for="post in props.posts" :key="post.id" class="post">
        <div class="post-body">{{ post.content }}</div>
        <v-btn v-if="route.params.id == userStore.getUser.id" @click="$emit('deletePost', post.id)">Удалить</v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRoute } from "vue-router";
import PostsApi from "@/modules/UserPage/API/posts.ts";

const emits = defineEmits(["createPost", "deletePost"]);

const props = defineProps({
  posts: Array,
});

const userStore = useUserStore();
const route = useRoute();

const createPostVisible = ref(false);
const postText = ref("");
</script>
<style scoped lang="scss">
.post-form {
  margin: 20px 0px;
}
.post {
  background-color: rgb(224, 224, 224);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgb(224, 224, 224);
}
.my-posts {
  display: grid;
  row-gap: 10px;
}
.post-list {
  display: grid;
  gap: 20px;
}
</style>
