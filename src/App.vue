<script setup lang="ts">
import TestingStuff from "./components/TestingStuff.vue";

import DragDiv from "./components/DragDiv.vue";
import FixedDataSizeScroll from "./components/FixedDataSizeScroll.vue";
import SelectWords1 from "./components/SelectWords1.vue";
import SelectWords2 from "./components/SelectWords2.vue";
import FancyAnimation from "./components/FancyAnimation.vue";

import { data, text } from "./utils/data.ts"
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

  <FancyAnimation />

  <TestingStuff :raw-text="text" />
</template>

<style scoped>
.wordsSelection {
  display: flex;
}
</style>
