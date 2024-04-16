<script setup lang="ts">
import { ref } from "vue";

const { data, start, end, gap } = defineProps<{
  data: {
    id: number;
    first_name: string;
    email: string;
  }[];
  start: number;
  end: number;
  gap: number;
}>();

const dataSize = ref({ start, end });
const partialData = ref(data.slice(dataSize.value.start, dataSize.value.end));

function scrollDown() {
  if (dataSize.value.start <= dataSize.value.end && dataSize.value.end <= data.length) {
    partialData.value = data.slice(dataSize.value.start, dataSize.value.end);
    dataSize.value = { start: dataSize.value.start + gap, end: dataSize.value.end + gap };
  }
}

function scrollUp() {
  if (dataSize.value.end >= dataSize.value.start && dataSize.value.start >= start) {
    partialData.value = data.slice(dataSize.value.start, dataSize.value.end);
    dataSize.value = { start: dataSize.value.start - gap, end: dataSize.value.end - gap };
  }
}

function handleScrollDirection(event: WheelEvent) {
  if (event.deltaY < 0) {
    scrollUp();
  } else if (event.deltaY > 0) {
    scrollDown();
  }
}
</script>

<template>
  <div class="scrollDiv" @wheel="handleScrollDirection">
    <h3>Fixed Data Size Scroll</h3>

    <div v-for="item in partialData" :key="item.id">
      {{ item.id }} - {{ item.email }}
    </div>
  </div>
</template>

<style scoped>
.scrollDiv {
  background-color: #fcf;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  overflow: hidden;
}
</style>
