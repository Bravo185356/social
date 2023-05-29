<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route);
</script>
