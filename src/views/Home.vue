<template>
  <div class="w-full h-screen flex flex-col items-center space-y-4 py-10">
    <div class="text-3xl">Coin Tracker</div>
    <CoinList :coin-list="coinList" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCoinList } from '../API/index.js'
import { CoinType } from '../utils/types.js'
import CoinList from '../components/CoinList.vue'

const coinList = ref<Array<CoinType>>([])

onMounted(() => {
  getCoinList('usd', 'bitcoin,ethereum,litecoin', '24h').then((res) => {
    coinList.value = res
  })
})
</script>
