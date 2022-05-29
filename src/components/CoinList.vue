<template>
  <div class="w-full h-full rounded shadow">
    <div v-if="loading" class="w-full h-60 flex items-center justify-center">
      <FontAwesomeIcon
        size="4x"
        fixedWidth
        spin
        class="inline-flex self-center"
        :icon="faCog"
      />
    </div>

    <table v-else class="w-full text-sm text-left text-gray-800 rounded">
      <thead class="text-xs text-gray-200 uppercase bg-gray-500 rounded">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Shortcode</th>
          <th scope="col" class="px-6 py-3">Current Price</th>
          <th scope="col" class="px-6 py-3">Change (24H)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b"
          v-for="(coin, index) in coins"
          :key="index"
        >
          <td class="px-6 flex items-center py-4">
            <img class="w-6 h-6 mr-4" :src="coin.image" :alt="coin.name" />
            {{ coin.name }}
          </td>
          <td class="px-6 py-4">
            {{ coin.symbol.toUpperCase() }}
          </td>
          <td class="px-6 py-4">
            {{
              coin.current_price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 8,
              })
            }}
          </td>
          <td class="px-6 py-4">
            {{ `${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%` }}
            <FontAwesomeIcon
              fixedWidth
              :class="
                coin.price_change_percentage_24h > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              "
              class="inline-flex self-center"
              :icon="
                coin.price_change_percentage_24h > 0 ? faUpLong : faDownLong
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { faCog, faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useCoinStore } from '../stores/coin'
import CoinCard from './CoinCard.vue'

const { coins, loading, error } = storeToRefs(useCoinStore())
const { fetchCoins } = useCoinStore()

onMounted(async () => {
  await fetchCoins(
    'inr',
    'shiba-inu,siacoin,bittorrent,spell-token,bitrise-token,terrausd,floki-inu,dogelon-mars,starlink,safemoon-2,baby-doge-coin,saitama-inu,kishu-inu,bitcoin',
    '24h'
  )
})
</script>
