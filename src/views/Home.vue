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
      <table
        v-else
        class="w-full text-sm text-left text-stone-800 rounded shadow table-auto"
      >
        <thead class="text-xs text-stone-200 uppercase bg-stone-700 rounded">
          <tr>
            <th class="px-2 py-2">#</th>
            <th class="px-2 py-2">Coin</th>
            <th class="px-2 py-2">Price</th>
            <th class="px-2 py-2">1h</th>
            <th class="px-2 py-2">24h</th>
            <th class="px-2 py-2">7d</th>
            <th class="px-2 py-2">All Time High</th>
            <th class="px-2 py-2">All Time Low</th>
            <th class="px-2 py-2">Total Volume</th>
            <th class="px-2 py-2">Total Supply</th>
            <th class="px-2 py-2">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white hover:bg-stone-100 transition border-b dark:bg-stone-700 dark:text-stone-50 dark:hover:bg-stone-500 dark:border-stone-500"
            v-for="(coin, index) in coins"
            :key="index"
          >
            <td class="px-2 py-1">{{ index + 1 }}</td>
            <td class="px-2 py-1 text-sm lg:text-base">
              <router-link
                :to="{ name: 'coin-detail', params: { id: coin.id } }"
                class="flex items-center"
              >
                <img class="w-6 h-6 mr-4" :src="coin.image" :alt="coin.name" />
                {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
              </router-link>
            </td>
            <td class="px-2 py-1">
              {{
                coin.current_price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 8,
                })
              }}
            </td>
            <td
              class="px-2 py-1 font-semibold"
              :class="
                coin.price_change_percentage_1h_in_currency > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              {{
                `${Math.abs(
                  coin.price_change_percentage_1h_in_currency
                ).toFixed(2)}%`
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
              class="px-2 py-1 font-semibold flex items-center"
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
              class="px-2 py-1 font-semibold"
              :class="
                coin.price_change_percentage_7d_in_currency > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              {{
                `${Math.abs(
                  coin.price_change_percentage_7d_in_currency
                ).toFixed(2)}%`
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
            <td class="px-2 py-1">
              {{
                coin.ath.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 8,
                })
              }}
            </td>
            <td class="px-2 py-1">
              {{
                coin.atl.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 8,
                })
              }}
            </td>
            <td class="px-2 py-1">
              {{
                coin.total_volume?.toLocaleString('en-US', {
                  notation: 'compact',
                  compactDisplay: 'long',
                  maximumFractionDigits: 2,
                })
              }}
            </td>
            <td class="px-2 py-1">
              {{
                coin.total_supply?.toLocaleString('en-US', {
                  notation: 'compact',
                  compactDisplay: 'long',
                  maximumFractionDigits: 2,
                })
              }}
            </td>
            <td class="px-2 py-1">
              <div class="h-auto rounded relative bg-stone-50 w-20">
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
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faCog, faDownLong, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useCoinStore } from '../stores/coin'
import SparklineCard from '../components/SparklineCard.vue'

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
