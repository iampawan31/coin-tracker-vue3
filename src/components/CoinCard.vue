<template>
  <router-link
    :to="{ name: 'coin-detail', params: { id: coin.id } }"
    class="bg-white p-2 rounded shadow flex text-lg w-full"
  >
    <div class="flex flex-col w-full">
      <!-- Header -->
      <div class="flex items-center w-full">
        <div class="flex items-center flex-1 space-x-4">
          <img class="w-10 h-10" :src="coin.image" :alt="coin.name" />
          <div>
            {{ coin.name }} -
            <span class="text-sm">({{ coin.symbol.toUpperCase() }})</span>
          </div>
        </div>
        <div class="flex items-center justify-center space-x">
          <div class="h-8 relative w-48">
            <SparklineCard
              :coinId="coin.id"
              :name="coin.name"
              :status="coin.price_change_percentage_7d_in_currency"
              :spark-chart="coin.sparkline_in_7d.price"
            />
          </div>
        </div>
      </div>
      <!-- Body -->
      <div class="w-full">
        <div>
          {{ `${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%` }}
        </div>
        <FontAwesomeIcon
          fixedWidth
          :class="
            coin.price_change_percentage_24h > 0
              ? 'text-green-600'
              : 'text-red-600'
          "
          class="inline-flex self-center"
          :icon="coin.price_change_percentage_24h > 0 ? faUpLong : faDownLong"
        />
        <div>
          {{
            coin.current_price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 8,
            })
          }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { CoinType } from '../utils/types'
import { getCoinMarketChart } from '../API'
import CoinChart from './CoinChart.vue'
import SparklineCard from './SparklineCard.vue'

const coinChart = ref([])

const props = defineProps({
  coin: {
    type: Object as PropType<CoinType>,
    required: true,
  },
})

// onMounted(async () => {
//   coinChart.value = await getCoinMarketChart(props.coin.id, 'inr', '1')
// })
</script>

<style scoped></style>
