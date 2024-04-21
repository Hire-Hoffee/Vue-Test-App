<script setup lang="ts">
import { ref, nextTick, toValue } from "vue";

const { rawText } = defineProps<{
  rawText: string
}>();

const splitText = rawText.split(/(\b\w+\b|\s+|[^\s\w])/gi).filter(Boolean);

const text = ref<string[]>(splitText);
const selectedWords = ref<(string | null)[]>([]);
const wordsCount = ref<{ word: string, count: number }[]>(toValue(countWords(splitText)));

function countWords(text: string[]) {
  const wordsList: { word: string, count: number }[] = [];

  text.forEach((item) => {
    const foundWord = wordsList.find(obj => obj.word === item);
    foundWord ? foundWord.count++ : wordsList.push({ word: item, count: 1 });
  })

  return wordsList;
}

function handleTextSelection(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const foundWord = wordsCount.value.find((obj) => obj.word === target.textContent);

  if (foundWord && foundWord.count > 0 && !target.classList.contains('selectedWord')) {
    target.classList.add('selectedWord')
    selectedWords.value.push(target.textContent);
    foundWord.count--;
  }
}

async function handleResetSelection() {
  text.value = [];
  await nextTick();

  text.value = splitText;
  selectedWords.value = [];
  wordsCount.value = countWords(splitText);
}
</script>

<template>
  <div class="wordsContainer">
    <h3 style="text-align: center;">Words selection 2</h3>

    <p>
      <span v-for="(word, idx) in text" :key="idx"
        @click="(e: PointerEvent) => !word?.match(/\W/) && handleTextSelection(e)" :class="!word.match(/\W/) && 'word'">
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
  color: #fff;
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
