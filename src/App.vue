<template>
  <div class="bg-gray-300 h-full min-h-screen">
    <Header />
    <div class="container mx-auto h-full w-full">
      <div class="w-full h-full flex flex-col items-center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
