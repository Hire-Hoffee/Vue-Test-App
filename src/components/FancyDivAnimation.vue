<script setup lang="ts">
import { ref } from "vue";

const { deg } = defineProps({
  deg: {
    type: Number,
    default: 20,
  }
});

const rotX = ref(0);
const rotY = ref(0);
const rotZ = ref(0);

function handleMouseMove(e: MouseEvent) {
  const node = e.target as HTMLElement;
  const elem = node.tagName === "DIV" ? node : node.parentElement;
  const rect = elem!.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x < rect.width / 2 && y < rect.height / 2) {
    if (rotX.value <= 1) rotX.value += .1;
    if (rotY.value >= -1) rotY.value -= .1;
    if (rotZ.value >= -.2) rotZ.value -= .1;
  }
  if (x < rect.width / 2 && y > rect.height / 2) {
    if (rotX.value >= -1) rotX.value -= .1;
    if (rotY.value >= -1) rotY.value -= .1;
    if (rotZ.value >= -.2) rotZ.value -= .1;
  }
  if (x > rect.width / 2 && y < rect.height / 2) {
    if (rotX.value <= 1) rotX.value += .1;
    if (rotY.value <= 1) rotY.value += .1;
    if (rotZ.value <= .2) rotZ.value += .1;
  }
  if (x > rect.width / 2 && y > rect.height / 2) {
    if (rotX.value >= -1) rotX.value -= .1;
    if (rotY.value <= 1) rotY.value += .1;
    if (rotZ.value <= .2) rotZ.value += .1;
  }
}

function resetRotation() {
  rotX.value = 0;
  rotY.value = 0;
  rotZ.value = 0;
}
</script>

<template>
  <div @mouseleave="resetRotation" class="backDiv">
    <div @mousemove="handleMouseMove" class="fancyDiv"
      :style="{ transform: `rotate3d(${rotX}, ${rotY}, ${rotZ}, ${deg}deg)`, transition: '.1s' }">
      <img src="https://random.imagecdn.app/300/200" alt="rnd_img">
      <h3>Fancy animation</h3>
    </div>
  </div>
</template>

<style scoped>
.backDiv {
  width: 320px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fancyDiv {
  background-color: #fcf;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  width: 300px;
  height: 200px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.fancyDiv img {
  position: absolute;
  z-index: -1;
  opacity: .8;
  filter: blur(2px);
}
</style>
