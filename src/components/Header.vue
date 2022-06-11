<template>
  <nav
    class="text-xl static top-0 z-50 font-bold text-stone-100 shadow bg-stone-700 px-2 py-3 w-full"
  >
    <div class="container mx-auto flex items-center justify-between px-2">
      <router-link
        class="hover:bg-stone-50 hover:text-stone-700 transition rounded p-2"
        to="/"
        >Coin Tracker</router-link
      >
      <button
        @click="toggleModal"
        class="text-stone-700 bg-stone-50 transition p-2 rounded"
      >
        Manage Coins
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAddCoinStore } from '../stores/addCoin'
const { toggleModal } = useAddCoinStore()
</script>
