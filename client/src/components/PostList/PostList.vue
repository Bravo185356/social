<template>
  <div class="my-posts">
    <div class="create-post">
      <v-btn @click="createPostVisible = true">Создать пост</v-btn>
      <v-form v-if="createPostVisible" class="post-form">
        <v-textarea label="Текст" v-model="postText"></v-textarea>
        <v-btn @click="createPost">Добавить</v-btn>
      </v-form>
    </div>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-body">{{ post.content }}</div>
        <v-btn v-if="route.params.id == userStore.getUser.id" @click="deletePost(post.id)">Удалить</v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRoute } from "vue-router";
import PostsApi from "@/Service/API/posts.ts";

const userStore = useUserStore();
const route = useRoute();

const posts = ref([]);
const createPostVisible = ref(false);
const postText = ref("");

async function createPost() {
  const body = {
    content: postText.value,
    userId: route.params.id,
  };
  const newPost = await PostsApi.createPost(body);
  posts.value = [...posts.value, newPost];
}
async function deletePost(id) {
  PostsApi.deletePost(id);
  posts.value = posts.value.filter(post => post.id !== id)
}
watch(
  () => route.params.id,
  async () => {
    if(route.params.id) {
      posts.value = await PostsApi.getUserPosts(route.params.id);
    }
  },
  { immediate: true }
);
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
