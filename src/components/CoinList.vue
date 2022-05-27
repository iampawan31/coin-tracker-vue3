<template>
  <div class="bg-slate-200 p-2 w-full max-w-xl rounded shadow">
    <div
      v-if="loading"
      class="w-full min-h-screen h-96 flex items-center justify-center"
    >
      <FontAwesomeIcon
        size="4x"
        fixedWidth
        spin
        class="inline-flex self-center"
        :icon="faCog"
      />
    </div>
    <div v-else class="flex space-y-2 flex-col">
      <div
        v-for="(coin, index) in coinList"
        :key="index"
        class="bg-white p-2 rounded shadow justify-between flex items-center text-2xl"
      >
        <div class="flex space-x-4">
          <img class="w-10 h-10" :src="coin.image" :alt="coin.name" />
          <div>
            {{ coin.name }}
          </div>
        </div>
        <div class="flex items-center justify-center space-x">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CoinType } from '../utils/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDownLong, faUpLong, faCog } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  coinList: {
    type: Array as PropType<Array<CoinType>>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>
