<template>
  <span :class="{ active: props.onlineStatus }" :style="{ width: props.w + 'px', height: props. h + 'px' }" class="online-item"></span>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.ts'

const props = defineProps({
  onlineStatus: Number,
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
    background-color: rgb(18, 255, 18);
  }
}
</style>
