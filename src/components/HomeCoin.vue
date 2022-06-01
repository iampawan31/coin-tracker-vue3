<template>
  <div
    class="bg-black/70 backdrop-blur-sm relative rounded shadow w-full h-full max-w-lg"
  >
    <div class="flex justify-between items-center p-4">
      <div class="text-3xl text-white font-semibold">
        {{
          coin.current_price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 8,
          })
        }}
      </div>
      <div
        :class="
          coin.price_change_percentage_24h > 0
            ? 'text-green-600 bg-green-400'
            : 'text-red-600 bg-red-400'
        "
        class="px-3 py-1 rounded-3xl"
      >
        {{ `${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%` }}
      </div>
    </div>
    <div class="my-2 py-2">
      <SparklineCard
        :coinId="coin.id"
        :name="coin.name"
        :status="coin.price_change_percentage_7d_in_currency"
        :spark-chart="coin.sparkline_in_7d.price"
      />
    </div>
    <!-- <div class="flex justify-around my-4 w-full">
      <button
        :class="activeSparkTime === '1h' ? 'bg-blue-600' : 'bg-white'"
        class="px-4 py-2 shadow hover:bg-gray-200 rounded"
      >
        1h
      </button>
      <button
        :class="activeSparkTime === '24h' ? 'bg-blue-600' : 'bg-white'"
        class="px-4 py-2 shadow rounded hover:bg-gray-200"
      >
        24h
      </button>
      <button
        :class="activeSparkTime === '7d' ? 'bg-blue-600' : 'bg-white'"
        class="px-4 py-2 shadow rounded hover:bg-gray-200"
      >
        7D
      </button>
      <button
        :class="activeSparkTime === '14d' ? 'bg-blue-600' : 'bg-white'"
        class="px-4 py-2 shadow rounded hover:bg-gray-200"
      >
        14D
      </button>
      <button
        :class="activeSparkTime === '30d' ? 'bg-blue-600' : 'bg-white'"
        class="px-4 py-2 shadow rounded hover:bg-gray-200"
      >
        30D
      </button>
      <button
        :class="activeSparkTime === '1y' ? 'bg-blue-600' : 'bg-white'"
        class="px-4 py-2 shadow rounded hover:bg-gray-200"
      >
        1Y
      </button>
    </div> -->
    <div class="p-4">
      <router-link
        :to="{ name: 'coin-detail', params: { id: coin.id } }"
        class="flex items-center text-lg text-white"
      >
        <img class="w-6 h-6 mr-2" :src="coin.image" :alt="coin.name" />
        {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
      </router-link>
    </div>
    <div
      class="bg-black/30 backdrop-blur-sm rounded shadow text-gray-100 mt-2 p-4"
    >
      <div class="flex">
        <div class="w-1/2">All Time High</div>
        <div class="w-1/2 flex justify-end">
          {{
            coin.ath.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 8,
            })
          }}
        </div>
      </div>
      <div class="flex">
        <div class="w-1/2">All Time Low</div>
        <div class="w-1/2 flex justify-end">
          {{
            coin.atl.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 8,
            })
          }}
        </div>
      </div>
      <div class="flex">
        <div class="w-1/2">Total Volume</div>
        <div class="w-1/2 flex justify-end">
          {{
            coin.total_volume?.toLocaleString('en-US', {
              notation: 'compact',
              compactDisplay: 'long',
              maximumFractionDigits: 1,
            })
          }}
        </div>
      </div>
      <div class="flex">
        <div class="w-1/2">Total Supply</div>
        <div class="w-1/2 flex justify-end">
          {{
            coin.total_supply?.toLocaleString('en-US', {
              notation: 'compact',
              compactDisplay: 'long',
              maximumFractionDigits: 1,
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue'
import SparklineCard from './SparklineCard.vue'
import { CoinType } from '../utils/types'

const props = defineProps({
  coin: {
    type: Object as PropType<CoinType>,
    required: true,
  },
})

const activeSparkTime = ref('1h')

const activeSparkLine = computed(() => {
  switch (activeSparkTime.value) {
    case '1h':
      return props.coin.sparkline_in_1h.price
    case '24h':
      return props.coin.sparkline_in_24h.price
    case '7d':
      return props.coin.sparkline_in_7d.price
    case '14d':
      return props.coin.sparkline_in_14d.price
    case '30d':
      return props.coin.sparkline_in_30d.price
    case '1y':
      return props.coin.sparkline_in_1y.price
    default:
      return []
  }
})
</script>
