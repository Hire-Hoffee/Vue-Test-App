<script setup lang="ts">
import { ref, nextTick } from "vue";

const { rawText } = defineProps<{
  rawText: string
}>();

const text = ref<string[]>([]);
const selectedWords = ref<(string | null)[]>([]);

const splitText = rawText.split(/(\b\w+\b|\s+|[^\s\w])/gi).filter(Boolean);
text.value = splitText;

function handleTextSelection(e: PointerEvent) {
  const target = e.target as HTMLElement;
  const content = target.textContent;

  !content?.match(/\W/) && target.classList.add('selectedWord');
  !selectedWords.value.includes(content) && selectedWords.value.push(content);
}

async function handleResetSelection() {
  text.value = [];
  await nextTick();
  text.value = splitText;
  selectedWords.value = [];
}
</script>

<template>
  <div class="wordsContainer">
    <h3 style="text-align: center;">Words selection 2</h3>

    <p>
      <span @click="handleTextSelection" :class="!word.match(/\W/) && 'word'" v-for="(word, idx) in text" :key="idx">
        {{ word }}
      </span>
    </p>
    <button @click="handleResetSelection">Reset selection</button>

    <h4 v-if="selectedWords.length" style="text-align: center;">Selected words</h4>
    <ul>
      <li v-for="word in selectedWords" :key="word">
        {{ word }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wordsContainer {
  background-color: #fcf;
  width: 300px;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  user-select: none;
}

.wordsContainer>p::selection {
  background-color: #D870D8;
}

.word {
  cursor: pointer;
  user-select: none;
}

.selectedWord {
  background-color: #D870D8;
  border-radius: 5px;
  padding: 1px 3px;
  font-size: 16.5px;
  vertical-align: super;
  animation: highlight .2s;
}

@keyframes highlight {
  0% {
    background-color: transparent;
    vertical-align: baseline;
    font-size: 16px;
  }

  50% {
    font-size: 17px;
  }

  100% {
    background-color: #D870D8;
    vertical-align: super;
    font-size: 16.5px;
  }
}
</style>
