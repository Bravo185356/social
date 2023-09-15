<template>
  <div class="input-wrapper">
    <div class="input-block">
      <div @click="$emit('acceptFilter')" class="btn-wrapper">
        <img src="../assets/icons/search-grey.svg" alt="search icon" />
      </div>
      <input v-model="nameInput" class="input" placeholder="Введите имя" />
    </div>
    <div class="actions-block">
      <div @click="$emit('toggleFilterSidebar')" class="btn-wrapper">
        <img src="../assets/icons/filter.svg" alt="filter icon" />
      </div>
      <span></span>
      <div @click="clearInputName" class="btn-wrapper">
        <img src="../assets/icons/x.svg" alt="clear input icon" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["acceptFilter", "toggleFilterSidebar", "clearName", "updateName"]);

const route = useRoute();
const router = useRouter()

const nameInput = ref("");

function clearInputName() {
  nameInput.value = "";
  router.push({ path: route.path });
}
watch(nameInput, () => {
  emit("updateName", nameInput.value);
});
</script>
<style scoped lang="scss">
.input-wrapper {
  position: relative;
  display: flex;
  gap: 40px;
  border: 1px solid #000;
  border-radius: 15px;
  max-width: 895px;
  margin: 0px auto;
  min-height: 67px;
  margin-bottom: 105px;
  span {
    display: inline-block;
    width: 1px;
    height: 43px;
    transform: translateY(25%);
    background-color: #000;
  }
}
.input-block {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
}
.actions-block {
  display: flex;
}
.btn-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  padding: 0px 35px;
  img {
    max-width: 35px;
    max-height: 35px;
  }
}
.input {
  flex: 1 1 auto;
  height: 100%;
}
.input-field {
  display: flex;
  align-items: center;
  gap: 40px;
  flex: 1 1 auto;
  input {
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
}
</style>