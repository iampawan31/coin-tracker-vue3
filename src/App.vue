<template>
  <div class="bg-stone-100 dark:bg-stone-600 h-full min-h-screen pb-6">
    <Header />
    <div class="container mx-auto h-full mt-5 w-full px-2 lg:px-0">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
