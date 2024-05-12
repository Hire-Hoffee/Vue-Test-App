<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  router.push('/done');
});
</script>

<template>
  <h1>An application to test some frontend features that I found interesting using the Vue framework</h1>

  <nav class="navigation">
    <RouterLink to="/done">Done projects</RouterLink>
    <RouterLink to="/testing">Testing stuff</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  margin: 10px 10px 20px 10px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 50px;
}

main {
  position: relative;
  margin-top: 20px;
}
</style>
