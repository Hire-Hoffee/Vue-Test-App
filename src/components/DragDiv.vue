<script setup lang="ts">
import { ref } from "vue";

const isDragging = ref(false);
const pos = ref({
  xLoc: 10,
  yLoc: 10,
  xGlob: 300,
  yGlob: 10,
});

function handleMouseDown(e: MouseEvent) {
  const node = e.target as HTMLElement;

  function findFirstParent(node: HTMLElement) {
    let foundNode = node;
    let breakLoop = false;

    while (!breakLoop && foundNode.tagName !== "MAIN") {
      if (foundNode.parentElement) {
        foundNode = foundNode.parentElement;
      } else {
        breakLoop = true;
      }
    }

    return foundNode;
  }

  const elem = node.tagName === "DIV" ? node : node.parentElement;
  const rect = elem!.getBoundingClientRect();
  const firstParent = findFirstParent(node).getBoundingClientRect();
  const x = e.clientX - rect.left + window.scrollX + firstParent.left;
  const y = e.clientY - rect.top + window.scrollY + firstParent.top;

  pos.value = { ...pos.value, xLoc: x, yLoc: y };
  isDragging.value = true;
}

function handleMouseMove(e: MouseEvent) {
  if (isDragging.value) {
    const x = Math.round(e.clientX - pos.value.xLoc!);
    const y = Math.round(e.clientY - pos.value.yLoc!);
    pos.value = { ...pos.value, xGlob: x, yGlob: y };
  }
}
</script>

<template>
  <div @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="isDragging = false"
    @mouseleave="isDragging = false" :class="[isDragging ? 'dragging' : '', 'dragDiv']" :style="{
      left: pos.xGlob + 'px',
      top: pos.yGlob + 'px',
    }">
    <slot />
  </div>
</template>

<style scoped>
.dragDiv {
  position: absolute;
  background-color: #fcf;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
}

.dragging {
  cursor: grabbing;
  scale: 1.05;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
