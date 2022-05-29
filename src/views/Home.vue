<template>
  <div class="w-full min-full flex flex-col items-center space-y-4 py-10">
    <button
      class="bg-gray-500 text-white hover:bg-gray-700 transition shadow p-2 w-20 rounded self-start"
    >
      <FontAwesomeIcon
        fixedWidth
        class="inline-flex self-center fa-beat"
        :icon="faPlus"
      />
    </button>
    <CoinList />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ref, onMounted } from 'vue'
import { getCoinList } from '../API/index.js'
import { CoinType } from '../utils/types.js'
import CoinList from '../components/CoinList.vue'
</script>
