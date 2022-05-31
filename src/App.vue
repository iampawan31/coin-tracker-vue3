<template>
  <div class="bg-gray-300 h-full min-h-screen">
    <Header />
    <div class="container mx-auto h-full w-full pt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
