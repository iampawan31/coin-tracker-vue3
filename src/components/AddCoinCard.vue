<template>
  <div
    class="bg-stone-200 my-2 rounded shadow w-full p-2 font-semibold flex justify-between"
  >
    <div class="flex items-center">
      <img :src="coin.large" class="h-8 mr-2" :alt="coin.name" />
      {{ coin.name }}
      <span class="ml-1 text-sm">({{ coin.symbol.toUpperCase() }}) </span>
    </div>
    <div>
      <button
        class="text-stone-50 px-2 py-1 rounded"
        :class="isAddedToFavoriteList ? 'bg-red-500' : 'bg-green-500'"
        @click="
          isAddedToFavoriteList
            ? removeFavoriteCoin(coin.id)
            : addFavoriteCoin(coin.id)
        "
      >
        <FontAwesomeIcon :icon="isAddedToFavoriteList ? faMinus : faPlus" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { storeToRefs } from 'pinia'
import { useCoinStore } from '../stores/coin'
import { computed } from 'vue'

const props = defineProps({
  coin: {
    type: Object,
    required: true,
  },
})

const isAddedToFavoriteList = computed(() => {
  return favoriteCoins.value.indexOf(props.coin.id) !== -1
})

const { addFavoriteCoin, removeFavoriteCoin } = useCoinStore()
const { favoriteCoins } = storeToRefs(useCoinStore())
</script>
