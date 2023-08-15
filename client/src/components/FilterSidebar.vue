<template>
  <div class="sidebar-wrap filter-sidebar">
    <div class="sidebar-content">
      <div>фильтр</div>
      <v-form>
        <v-text-field variant="underlined" v-model="name" label="Имя" />
        <v-btn @click.prevent="$emit('acceptFilter', name)" type="submit" block>Поиск</v-btn>
        <div v-if="resetButtonVisible" @click="resetFilter">Сбросить фильтр</div>
      </v-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute()

const name = ref("");


function resetFilter() {
  name.value = ''
  router.push(route.path)
}
const resetButtonVisible = computed(() => {
    return Object.keys(route.query).length
})
</script>
<style scoped>
.filter-sidebar {
  position: relative;
  flex: 0 0 300px;
}
.sidebar-content {
  width: 280px;
}
</style>
