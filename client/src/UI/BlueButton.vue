<template>
  <button class="blue-btn"><slot></slot></button>
</template>
<script setup></script>
<style scoped lang="scss">
.blue-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 64px;
  gap: 10px;
  line-height: 24px;
  padding: 10px 25px;
  font-size: 18px;
  border-radius: 12px;
  color: white;
  background-color: #3f46d6;
}
</style>
