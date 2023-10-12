<template>
    <slot></slot>
</template>
<script setup>
import { onMounted, onUnmounted, defineEmits } from "vue";

const emit = defineEmits(["closeDropMenu"]);

function handleDropMenu(e) {
  if (!e.target.closest(".profile-link") || e.target.closest('.drop-menu-item')) {
    emit("closeDropMenu");
  }
}
onMounted(() => {
  window.addEventListener("click", handleDropMenu);
});
onUnmounted(() => {
  window.removeEventListener("click", handleDropMenu);
});
</script>
<style scoped lang="scss"></style>