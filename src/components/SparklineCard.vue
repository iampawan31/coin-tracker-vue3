<template>
  <div>
    <canvas ref="canvasRef" :id="coinId" width="50px" height="50px" />
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-moment'
import moment from 'moment'
import { computed, defineProps, onMounted, PropType, ref } from 'vue'
import { chartOptions } from '../utils/config'
import { getSparklineChartLabels } from '../utils/index'

Chart.register(...registerables)

const props = defineProps({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  sparkChart: { type: Array, required: true },
  status: { type: Number, required: true },
})

const canvasRef = ref(null)

onMounted(() => {
  if (canvasRef && canvasRef.value) {
    new Chart(canvasRef.value, {
      type: 'line',
      data: {
        labels: getSparklineChartLabels(),
        datasets: [
          {
            data: props.sparkChart,
            borderColor: props.status > 0 ? '#00aa00' : '#aa0000',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          xAxis: {
            display: false,
          },
          yAxis: {
            display: false,
          },
        },
      },
    })
  }
})
</script>

<style scoped></style>
