<template>
  <div
    class="bg-gradient-to-b from-cyan-400 to-pink-600 h-full min-h-screen py-6"
  >
    <!-- <Header /> -->
    <div class="container mx-auto h-full w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
