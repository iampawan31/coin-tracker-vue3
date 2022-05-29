<template>
  <div class="">
    <Line
      v-if="coinChart"
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="coinId"
      :width="250"
      :height="250"
    />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, registerables } from 'chart.js'
import 'chartjs-adapter-moment'
import { computed, defineProps, PropType } from 'vue'
import { Line } from 'vue-chartjs'
import { chartOptions } from '../utils/config'
import { CoinChartType } from '../utils/types'

ChartJS.register(...registerables)

const props = defineProps({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  coinChart: { type: Array as PropType<CoinChartType>, required: true },
})

const chartData = computed(() => {
  const data = props.coinChart.map((item) => {
    return {
      x: item[0],
      y: item[1].toFixed(2),
    }
  })

  return {
    legend: {
      display: false,
    },
    datasets: [
      {
        data,
        borderColor: '#ffee00',
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
  }
})
</script>
