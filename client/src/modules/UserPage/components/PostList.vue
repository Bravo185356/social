<template>
  <div class="my-posts">
    <div class="create-post">
      <blue-button @click="createPostVisible = true">Создать пост</blue-button>
      <v-form v-if="createPostVisible" class="post-form">
        <v-textarea label="Текст" v-model="postText"></v-textarea>
        <blue-button class="btn-right" @click="createPost">Добавить</blue-button>
      </v-form>
    </div>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-body">{{ post.content }}</div>
        <blue-button v-if="route.params.id == userStore.getUser.id" @click="deletePost(post.id)">Удалить</blue-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user.ts";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import PostsApi from "@/modules/UserPage/API/posts.ts";
import BlueButton from "@/UI/BlueButton.vue";

const props = defineProps({
  posts: Array,
});

const userStore = useUserStore();
const route = useRoute();

const createPostVisible = ref(false);
const postText = ref("");
const posts = ref(props.posts);

async function createPost() {
  const body = {
    content: postText.value,
    userId: route.params.id,
  };
  const newPost = await PostsApi.createPost(body);
  posts.value = [...posts.value, newPost];
}
function deletePost(id) {
  PostsApi.deletePost(id);
  posts.value = posts.value.filter((post) => post.id !== id);
}
onBeforeRouteUpdate(async (to, from) => {
  posts.value = await PostsApi.getUserPosts(to.params.id);
});
</script>
<style scoped lang="scss">
.post-form {
  display: grid;
  margin: 20px 0px;
}
.btn-right {
  justify-self: end;
}
.post {
  display: grid;
  align-items: start;
  justify-content: start;
  gap: 10px;
  background-color: #D9D9D9;;
  padding: 20px;
  font-size: 20px;
  line-height: 24px;
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
