<template>
  <span :class="{ active: props.onlineStatus, 'with-avatar': withAvatar }" :style="{ width: props.w + 'px', height: props. h + 'px' }" class="online-item"></span>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'

const props = defineProps({
  onlineStatus: Number,
  withAvatar: Boolean,
  w: Number,
  h: Number,
});

const userStore = useUserStore()
const route = useRoute()

</script>
<style scoped lang="scss">
.online-item {
  display: inline-block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: gray;
  &.active {
    background-color: #31EA2D;
  }
}
.with-avatar {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
