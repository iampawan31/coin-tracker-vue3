<template>
  <div class="bg-stone-50 flex justify-between border-b p-4">
    <div class="flex flex-col">
      <div class="flex flex-row w-full items-center pb-2">
        <img
          class="w-6 h-6 lg:w-10 lg:h-10 mr-2"
          :src="coin.image"
          :alt="coin.name"
        />
        <div class="text-base lg:text-xl">
          <router-link
            class="font-semi mr-1 lg:mr-0 transition hover:cursor-pointer"
            :to="{ name: 'coin-detail', params: { id: coin.id } }"
          >
            {{ coin.name }}
          </router-link>
          <span class="hidden lg:visible mr-2 text-sm">
            ({{ coin.symbol.toUpperCase() }})
          </span>
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
      <div class="flex flex-col w-full">
        <div
          class="text-lg lg:text-2xl font-bold"
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
    </div>
    <div class="w-28 bg-stone-200 py-2 rounded h-fit">
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
