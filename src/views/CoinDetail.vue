<template>
  <div
    v-if="loading"
    class="w-full h-60 flex bg-white items-center justify-center"
  >
    <FontAwesomeIcon
      size="4x"
      fixedWidth
      spin
      class="inline-flex self-center"
      :icon="faCog"
    />
  </div>
  <div v-else>
    <div class="bg-gray-50 px-2 py-1 rounded shadow w-fit mb-5">
      Coin > {{ coin.name }}
    </div>
    <div class="flex flex-col space-y-2 w-full bg-white rounded shadow p-4">
      <div class="flex items-center space-x-2 text-xl">
        <img :src="coin.image.small" :alt="coin?.name" />
        <div>{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</div>
      </div>
      <div class="text-3xl">
        {{
          coin?.market_data.current_price.inr.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 8,
          })
        }}
        <span
          :class="
            coin.market_data.price_change_percentage_24h > 0
              ? 'text-green-300'
              : 'text-red-300'
          "
        >
          {{ coin.market_data.price_change_percentage_24h.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoinStore } from '../stores/coin'

const route = useRoute()
const { coin, loading, error } = storeToRefs(useCoinStore())
const { fetchCoinById } = useCoinStore()

onMounted(async () => {
  const coinId = route.params.id
  await fetchCoinById(coinId as string)
})
</script>
