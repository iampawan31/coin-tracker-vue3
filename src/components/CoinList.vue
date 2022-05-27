<template>
  <div class="bg-slate-200 p-2 w-full max-w-xl space-y-2 text-3xl rounded">
    <div
      v-for="(coin, index) in coinList"
      :key="index"
      class="bg-white p-2 rounded flex justify-between items-center"
    >
      <div>
        {{ coin.name }}
      </div>
      <div class="flex items-center justify-center space-x">
        <FontAwesomeIcon
          fixedWidth
          :class="
            coin.price_change_percentage_24h > 0
              ? 'text-green-600'
              : 'text-red-600'
          "
          class="inline-flex self-center"
          :icon="coin.price_change_percentage_24h > 0 ? faSortUp : faSortDown"
        />
        <div>
          {{ `${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CoinType } from '../utils/types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

const props = defineProps({
  coinList: {
    type: Array as PropType<Array<CoinType>>,
    required: true,
  },
})
</script>
