<template>
  <div class="bg-white dark:bg-gray-500 h-full min-h-screen py-6">
    <!-- <Header /> -->
    <div class="container mx-auto h-full w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
