<script setup lang="ts">
import { ref, nextTick } from "vue";

const { rawText } = defineProps<{
  rawText: string
}>();

const text = ref<string>("");
const selectedWords = ref<string[]>([]);

text.value = rawText;

function handleTextSelection() {
  const range = window.getSelection()!.getRangeAt(0);

  const regEx = new RegExp(/(\b\w+\b|\s+|[^\s\w])/, 'gi');
  const parsedRawText = rawText.split(regEx).filter(Boolean);
  const parsedWords = range.toString().split(regEx).filter(Boolean);

  const htmlElList = parsedWords.map((word) => {
    if (word.match(/\W/) || !parsedRawText.includes(word)) {
      return document.createTextNode(word);
    }
    // Посчитать количество одинаковых слов изначальном тексте
    !selectedWords.value.includes(word) && selectedWords.value.push(word)

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

.wordsContainer :deep(.selectedWord) {
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
