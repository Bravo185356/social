<template>
  <div v-if="errors.length" class="errors">
    <div class="error-item" v-for="error in props.errors">{{ error }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
    errors: Array
})
</script>
<style scoped lang="scss">
.errors {
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.589);
  box-shadow: 0px 0px 5px rgba(255, 0, 0, 0.589);
  border-radius: 10px;
  margin-bottom: 20px;
}
</style>
