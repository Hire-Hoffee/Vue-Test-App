<script setup lang="ts">
import DragDiv from "../components/DragDiv.vue";
import FixedDataSizeScroll from "../components/FixedDataSizeScroll.vue";
import SelectWords1 from "../components/SelectWords1.vue";
import SelectWords2 from "../components/SelectWords2.vue";
import FancyAnimation from "../components/FancyAnimation.vue";

import { data, text } from "../utils/data"
</script>

<template>
  <DragDiv>
    <h3>Draggable div</h3>
  </DragDiv>

  <FixedDataSizeScroll :data="data" :start='0' :end="10" :gap="10" />

  <div class="wordsSelection">
    <SelectWords1 :raw-text="text" />
    <SelectWords2 :raw-text="text" />
  </div>

  <FancyAnimation :deg="15" />
</template>

<style scoped>
.wordsSelection {
  display: flex;
}
</style>
