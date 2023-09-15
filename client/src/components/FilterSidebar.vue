<template>
  <Transition>
    <div v-if="showFilterSidebar" class="sidebar-wrap filter-sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <div>Фильтр</div>
          <div @click="$emit('closeSidebar')" class="close-btn"><img src="../assets/icons/x-circle.svg" alt="close button" /></div>
        </div>
        <v-form>
          <v-text-field class="input" variant="underlined" v-model="city" label="Город" />
          <div v-if="resetButtonVisible" @click="resetFilter">Сбросить фильтр</div>
        </v-form>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect, defineEmits } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  showFilterSidebar: Boolean,
});

const emit = defineEmits(["updateFilters", "closeSidebar"]);

const router = useRouter();
const route = useRoute();

const city = ref("");

watchEffect(() => {
  console.log("watch");
  emit("updateFilters", { city: city.value });
});

function resetFilter() {
  city.value = "";
  router.push(route.path);
}
const resetButtonVisible = computed(() => {
  return Object.keys(route.query).length;
});
</script>
<style scoped>
.filter-sidebar {
  position: fixed;
  right: 0;
  top: 60px;
  height: 100%;
  width: 300px;
  z-index: 10;
  padding: 30px 22px;
}
.sidebar-content {
  width: 256px;
}
.sidebar-header {
  display: flex;
  justify-content: space-between;
}
.close-btn {
  cursor: pointer;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  transform: translateX(110%);
}
.v-enter-to,
.v-leave-from {
  transform: translateX(0);
}
</style>
