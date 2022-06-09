<template>
  <div class="bg-stone-50 rounded-lg shadow-lg hover:shadow-xl transition py-4">
    <div class="flex flex-row w-full items-center justify-between pb-8 px-4">
      <div class="text-xl">
        <span>
          {{ coin.name }}
        </span>
        <span class="text-sm"> ({{ coin.symbol.toUpperCase() }}) </span>
      </div>
      <div>
        <button
          @click="removeFavoriteCoin(coin.id)"
          class="text-green-600 hover:text-yellow-500 transition"
        >
          <FontAwesomeIcon :icon="faStar" />
        </button>
      </div>
    </div>
    <router-link :to="{ name: 'coin-detail', params: { id: coin.id } }">
      <div class="flex flex-col justify-center items-center w-full">
        <img class="w-14 h-14 mb-2" :src="coin.image" :alt="coin.name" />
        <div
          class="text-2xl font-bold"
          :class="
            coin.price_change_percentage_1h_in_currency > 0
              ? 'text-green-600'
              : 'text-red-600'
          "
        >
          {{
            coin.current_price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 8,
            })
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
        </div>
      </div>
    </router-link>
    <div class="w-full h-fit">
      <SparklineCard
        :coinId="coin.id"
        :name="coin.name"
        :status="coin.price_change_percentage_7d_in_currency"
        :spark-chart="coin.sparkline_in_7d.price"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { faDownLong, faUpLong, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useCoinStore } from '../stores/coin'
import SparklineCard from './SparklineCard.vue'
defineProps({
  coin: {
    type: Object,
    required: true,
  },
})

const { removeFavoriteCoin } = useCoinStore()
</script>
