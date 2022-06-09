<template>
  <div class="w-full min-full flex flex-col items-center space-y-4 pb-10">
    <div class="w-full h-full">
      <div
        v-if="loading"
        class="w-full h-60 flex bg-white items-center justify-center rounded shadow"
      >
        <FontAwesomeIcon
          size="4x"
          fixedWidth
          spin
          class="inline-flex self-center"
          :icon="faCog"
        />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CoinCardHome v-for="coin in coins" :key="coin.id" :coin="coin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useCoinStore } from '../stores/coin'
import CoinCardHome from '../components/CoinCardHome.vue'

const { coins, favoriteCoins, loading, error } = storeToRefs(useCoinStore())
const { fetchCoins } = useCoinStore()

onMounted(async () => {
  if (coins.value.length === 0) {
    await fetchCoins(
      'inr',
      favoriteCoins.value.join(','),
      '1h,24h,7d,14d,30d,1y'
    )
  }
})
</script>
