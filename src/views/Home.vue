<template>
  <div
    class="w-full max-w-xl mx-auto h-screen flex flex-col items-center space-y-4 py-10"
  >
    <div
      class="text-3xl font-bold text-center text-gray-100 shadow bg-yellow-500 p-4 rounded w-full"
    >
      Coin Tracker
    </div>
    <button
      class="bg-gray-400 text-white hover:bg-gray-500 transition shadow p-2 rounded self-start"
    >
      Add Coin
    </button>
    <CoinList :coin-list="coinList" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCoinList } from '../API/index.js'
import { CoinType } from '../utils/types.js'
import CoinList from '../components/CoinList.vue'

const coinList = ref<Array<CoinType>>([])
const loading = ref(false)

onMounted(() => {
  loading.value = true
  getCoinList('usd', 'bitcoin,ethereum,litecoin', '24h').then((res) => {
    coinList.value = res
    loading.value = false
  })
})
</script>
