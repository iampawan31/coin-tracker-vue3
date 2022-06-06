<template>
  <div
    v-if="loading"
    class="w-full h-60 flex bg-stone-50 dark:bg-stone-500 items-center justify-center"
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
    <div
      class="w-full max-w-2xl mx-auto bg-stone-50 dark:bg-stone-700 dark:text-stone-50 shadow rounded p-4"
    >
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center text-xl lg:text-4xl font-semibold">
          <img class="w-8 h-8 mr-2" :src="coin.image?.large" :alt="coin.name" />
          {{ coin.name }} ({{ coin.symbol?.toUpperCase() }})
        </div>
        <div class="flex items-center space-x-2">
          <div class="text-lg lg:text-2xl">
            {{
              coin.market_data?.current_price?.inr.toLocaleString('en-US', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 8,
              })
            }}
          </div>
          <div
            :class="
              coin.market_data?.price_change_percentage_24h > 0
                ? 'text-green-100 bg-green-600'
                : 'text-red-100 bg-red-600'
            "
            class="px-2 text-xs rounded-3xl w-fit"
          >
            {{
              `${Math.abs(
                coin.market_data?.price_change_percentage_24h
              ).toFixed(2)}%`
            }}
            <FontAwesomeIcon
              fixedWidth
              :icon="
                coin.market_data?.price_change_percentage_24h > 0
                  ? faUpLong
                  : faDownLong
              "
            />
          </div>
        </div>
      </div>
      <div class="bg-stone-100 dark:bg-stone-800 py-2 rounded">
        <div
          v-if="coinChartDataLoading"
          class="w-full h-48 lg:h-72 flex items-center justify-center mb-6"
        >
          <FontAwesomeIcon
            size="4x"
            fixedWidth
            spin
            class="inline-flex self-center"
            :icon="faCog"
          />
        </div>
        <CoinChart
          v-else
          :coinId="coin?.id"
          :name="coin?.name"
          :coinChart="coinChartData"
          class="h-48 lg:h-72"
          :status="coinChartDataStatus"
        />
        <div
          class="flex mt-4 lg:mt-8 px-2 justify-center lg:justify-end w-full"
        >
          <button
            @click="getChartData('1h')"
            :class="
              activeSparkTime === '1h'
                ? 'bg-stone-700 text-gray-50'
                : 'bg-white hover:bg-gray-200 dark:bg-stone-500 dark:text-stone-50'
            "
            class="px-4 py-2 shadow rounded-l-lg"
          >
            1h
          </button>
          <button
            @click="getChartData('24h')"
            :class="
              activeSparkTime === '24h'
                ? 'bg-stone-700 text-gray-50'
                : 'bg-white text-stone-700 hover:bg-gray-200 dark:bg-stone-500 dark:text-stone-50'
            "
            class="px-4 py-2 shadow"
          >
            24h
          </button>
          <button
            @click="getChartData('7d')"
            :class="
              activeSparkTime === '7d'
                ? 'bg-stone-700 text-gray-50'
                : 'bg-white text-stone-700 hover:bg-gray-200 dark:bg-stone-500 dark:text-stone-50'
            "
            class="px-4 py-2 shadow"
          >
            7D
          </button>
          <button
            @click="getChartData('14d')"
            :class="
              activeSparkTime === '14d'
                ? 'bg-stone-700 text-gray-50'
                : 'bg-white text-stone-700 hover:bg-gray-200 dark:bg-stone-500 dark:text-stone-50'
            "
            class="px-4 py-2 shadow transition"
          >
            14D
          </button>
          <button
            @click="getChartData('30d')"
            :class="
              activeSparkTime === '30d'
                ? 'bg-stone-700 text-gray-50'
                : 'bg-white text-stone-700 hover:bg-gray-200 dark:bg-stone-500 dark:text-stone-50'
            "
            class="px-4 py-2 shadow"
          >
            30D
          </button>
          <button
            @click="getChartData('1y')"
            :class="
              activeSparkTime === '1y'
                ? 'bg-stone-700 text-gray-50'
                : 'bg-white text-stone-700 hover:bg-gray-200 dark:bg-stone-500 dark:text-stone-50'
            "
            class="px-4 py-2 shadow rounded-r-lg"
          >
            1Y
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4">
        <div class="px-2 py-2 font-bold">All Time High</div>
        <div class="px-2 py-2">
          {{
            coin?.market_data?.ath?.inr.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 8,
            })
          }}
        </div>
        <div class="px-2 py-2 font-bold">All Time Low</div>
        <div class="px-2 py-2">
          {{
            coin?.market_data?.atl?.inr.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 8,
            })
          }}
        </div>
        <div class="px-2 py-2 font-bold">Total Volume</div>
        <div class="px-2 py-2">
          {{
            coin?.market_data?.total_volume.inr?.toLocaleString('en-US', {
              notation: 'compact',
              compactDisplay: 'long',
              maximumFractionDigits: 2,
            })
          }}
        </div>
        <div class="px-2 py-2 font-bold">Total Supply</div>
        <div class="px-2 py-2">
          {{
            coin?.market_data?.total_supply?.toLocaleString('en-US', {
              notation: 'compact',
              compactDisplay: 'long',
              maximumFractionDigits: 2,
            })
          }}
        </div>
      </div>
      <div class="text-4xl font-semibold mb-2 mt-6">About</div>
      <div v-html="coin?.description?.en"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCog, faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCoinStore } from '../stores/coin'
import CoinChart from '../components/CoinChart.vue'

const route = useRoute()
const { coin, coinChartData, loading, coinChartDataLoading, error } =
  storeToRefs(useCoinStore())
const { fetchCoinById, fetchCoinChartData } = useCoinStore()

const activeSparkTime = ref('1h')

const coinChartDataStatus = computed(() => {
  switch (activeSparkTime.value) {
    case '1h':
      return coin?.value?.market_data?.price_change_percentage_24h > 0
    case '24h':
      return coin?.value?.market_data?.price_change_percentage_24h > 0
    case '7d':
      return coin?.value?.market_data?.price_change_percentage_7d > 0
    case '14d':
      return coin?.value?.market_data?.price_change_percentage_14d > 0
    case '30d':
      return coin?.value?.market_data?.price_change_percentage_30d > 0
    case '1y':
      return coin?.value?.market_data?.price_change_percentage_1y > 0
    default:
      return false
  }
})

const getChartData = async (timeRange: string) => {
  if (timeRange !== activeSparkTime.value) {
    activeSparkTime.value = timeRange
    await fetchCoinChartData(route.params.id, 'inr', timeRange)
  }
}

onMounted(async () => {
  await fetchCoinById(route.params.id)
  await fetchCoinChartData(route.params.id, 'inr', '1h')
})
</script>
