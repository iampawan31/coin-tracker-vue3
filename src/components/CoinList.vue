<template>
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
    <div
      v-else
      class="w-full text-sm text-left text-gray-800 grid grid-cols-3 gap-2"
    >
      <HomeCoin v-for="(coin, index) in coins" :key="index" :coin="coin" />
    </div>

    <!-- <table v-else class="w-full text-sm text-left text-gray-800 rounded">
      <thead class="text-xs text-gray-200 uppercase bg-gray-500 rounded">
        <tr>
          <th scope="col" class="px-6 py-3">#</th>
          <th scope="col" class="px-6 py-3">Coin</th>
          <th scope="col" class="px-6 py-3">Rank</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">1h</th>
          <th scope="col" class="px-6 py-3">24h</th>
          <th scope="col" class="px-6 py-3">7d</th>
          <th scope="col" class="px-6 py-3">Last 7 Days</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white hover:bg-gray-100 transition border-b"
          v-for="(coin, index) in coins"
          :key="index"
        >
          <td class="px-6 py-4">{{ index + 1 }}</td>
          <td class="px-6 py-4">
            <router-link
              :to="{ name: 'coin-detail', params: { id: coin.id } }"
              class="flex items-center"
            >
              <img class="w-6 h-6 mr-4" :src="coin.image" :alt="coin.name" />
              {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
            </router-link>
          </td>
          <td class="px-6 py-4">
            {{ coin.market_cap_rank ? coin.market_cap_rank : '-' }}
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
          <td
            class="px-6 py-4 font-semibold"
            :class="
              coin.price_change_percentage_1h_in_currency > 0
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            {{
              `${Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(
                2
              )}%`
            }}
            <FontAwesomeIcon
              fixedWidth
              class="inline-flex self-center"
              :icon="
                coin.price_change_percentage_1h_in_currency > 0
                  ? faUpLong
                  : faDownLong
              "
            />
          </td>
          <td
            class="px-6 py-4 font-semibold"
            :class="
              coin.price_change_percentage_24h > 0
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            {{ `${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%` }}
            <FontAwesomeIcon
              fixedWidth
              class="inline-flex self-center"
              :icon="
                coin.price_change_percentage_24h > 0 ? faUpLong : faDownLong
              "
            />
          </td>
          <td
            class="px-6 py-4 font-semibold"
            :class="
              coin.price_change_percentage_7d_in_currency > 0
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            {{
              `${Math.abs(coin.price_change_percentage_7d_in_currency).toFixed(
                2
              )}%`
            }}
            <FontAwesomeIcon
              fixedWidth
              class="inline-flex self-center"
              :icon="
                coin.price_change_percentage_7d_in_currency > 0
                  ? faUpLong
                  : faDownLong
              "
            />
          </td>
          <td class="px-6 py-4">
            <div class="h-auto rounded relative bg-gray-50 w-20">
              <SparklineCard
                :coinId="coin.id"
                :name="coin.name"
                :status="coin.price_change_percentage_7d_in_currency"
                :spark-chart="coin.sparkline_in_7d.price"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script setup lang="ts">
import { faCog, faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useCoinStore } from '../stores/coin'
import CoinCard from './CoinCard.vue'
import SparklineCard from './SparklineCard.vue'
import HomeCoin from './HomeCoin.vue'

const { coins, loading, error } = storeToRefs(useCoinStore())
const { fetchCoins } = useCoinStore()

onMounted(async () => {
  if (coins.value.length === 0) {
    await fetchCoins(
      'inr',
      'shiba-inu,siacoin,bittorrent,spell-token,bitrise-token,terra-luna,floki-inu,dogelon-mars,starlink,safemoon-2,baby-doge-coin,saitama-inu,kishu-inu,bitcoin',
      '1h,24h,7d,14d,30d,1y'
    )
  }
})
</script>
