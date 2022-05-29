<template>
  <div class="flex justify-start w-full">
    <router-link class="bg-gray-400 p-2 w-24 text-center rounded shadow" to="/"
      >Home</router-link
    >
  </div>
  <div class="flex w-full">
    <div>Coin Detail</div>
    <div>{{ $route.params.id }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getCoinById } from '../API'
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(async () => {
  const coinId = route.params.id
  const data = await getCoinById(coinId as string)
  console.log(data)
})
</script>
