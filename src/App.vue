<template>
  <div class="bg-stone-100 dark:bg-stone-600 h-full min-h-screen pb-6">
    <Header />
    <div class="container mx-auto h-full mt-5 w-full px-2 lg:px-0">
      <router-view />
    </div>
    <ManageCoinModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue'
import ManageCoinModal from './components/ManageCoinModal.vue'
import { useCoinStore } from './stores/coin'

const { addFavoriteCoins } = useCoinStore()
const isModalOpen = ref(false)

onMounted(() => {
  const defaultCoins = [
    'shiba-inu',
    'siacoin',
    'bittorrent',
    'spell-token',
    'bitrise-token',
    'terra-luna',
    'floki-inu',
    'dogelon-mars',
    'starlink',
    'safemoon-2',
    'baby-doge-coin',
    'saitama-inu',
    'kishu-inu',
    'bitcoin',
  ]
  const favoriteCoins = localStorage.getItem('favoriteCoins')

  if (favoriteCoins && favoriteCoins.length > 0) {
    addFavoriteCoins(JSON.parse(favoriteCoins))
  } else {
    addFavoriteCoins()
  }
})
</script>
