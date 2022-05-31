<template>
  <nav
    class="text-xl static top-0 z-50 font-bold text-gray-100 shadow bg-gray-500 px-2 py-3 w-full"
  >
    <div class="container mx-auto flex justify-between">
      <router-link to="/">Coin Tracker</router-link>
      <button class="text-white hover:bg-gray-700 transition">
        <FontAwesomeIcon
          fixedWidth
          class="inline-flex self-center fa-beat"
          :icon="faPlus"
        />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
</script>
