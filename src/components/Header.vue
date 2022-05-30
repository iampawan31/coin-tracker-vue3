<template>
  <nav
    class="text-xl fixed top-0 z-50 font-bold flex justify-between text-gray-100 shadow bg-gray-500 p-2 w-full"
  >
    <div>Coin Tracker</div>
    <button class="text-white hover:bg-gray-700 transition">
      <FontAwesomeIcon
        fixedWidth
        class="inline-flex self-center fa-beat"
        :icon="faPlus"
      />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
</script>
