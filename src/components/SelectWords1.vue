<script setup lang="ts">
import { ref, nextTick, toValue } from "vue";

const { rawText } = defineProps<{
  rawText: string
}>();

const splitText = rawText.split(/(\b\w+\b|\s+|[^\s\w])/gi).filter(Boolean);

const text = ref<string>(rawText);
const selectedWords = ref<string[]>([]);
const wordsCount = ref<{ word: string, count: number }[]>(toValue(countWords(splitText)));

function countWords(text: string[]) {
  const wordsList: { word: string, count: number }[] = [];

  text.forEach((item) => {
    const foundWord = wordsList.find(obj => obj.word === item);
    foundWord ? foundWord.count++ : wordsList.push({ word: item, count: 1 });
  })

  return wordsList;
}

function handleTextSelection() {
  const range = window.getSelection()!.getRangeAt(0);
  const existingNode = window.getSelection()!.anchorNode?.parentNode as HTMLElement;
  const regEx = new RegExp(/(\b\w+\b|\s+|[^\s\w])/, 'gi');
  const parsedRawText = rawText.split(regEx).filter(Boolean);
  const parsedWords = range.toString().split(regEx).filter(Boolean);

  const htmlElList = parsedWords.map((word) => {
    if (word.match(/\W/) || !parsedRawText.includes(word)) {
      return document.createTextNode(word);
    }

    const foundWord = wordsCount.value.find((obj) => obj.word === word);
    if (foundWord && foundWord.count > 0 && !existingNode.className) {
      selectedWords.value.push(word);
      foundWord.count--;
    }

    if (existingNode.className) {
      existingNode.remove();
    }

    const node = document.createTextNode(word);
    const span = document.createElement("span");
    span.classList.add("selectedWord");
    span.appendChild(node);

    return span;
  });

  range.extractContents();
  htmlElList.reverse().forEach((el) => range.insertNode(el));

  window.getSelection()?.empty();
}

async function handleResetSelection() {
  text.value = "";
  await nextTick();

  text.value = rawText;
  selectedWords.value = [];
  wordsCount.value = countWords(splitText);
}
</script>

<template>
  <div class="wordsContainer">
    <h3 style="text-align: center;">Words selection 1</h3>

    <p @mouseup="handleTextSelection">{{ text }}</p>
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
}

.wordsContainer>p::selection {
  background-color: #D870D8;
}

.wordsContainer :deep(.selectedWord)::selection {
  background-color: #8b478b;
}

.wordsContainer :deep(.selectedWord) {
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
