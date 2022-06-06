<template>
  <div>
    <canvas ref="canvasRef" :id="coinId" />
  </div>
</template>

<script setup lang="ts">
import { ChartData } from 'chart.js'
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-moment'
import { computed, onMounted, PropType, ref } from 'vue'
import { chartOptions } from '../utils/config'
import { CoinChartType } from '../utils/types'

Chart.register(...registerables)

const props = defineProps({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  coinChart: { type: Array as PropType<CoinChartType>, required: true },
})

const canvasRef = ref(null)

const chartData = computed(() => {
  const data = props.coinChart.map((item) => {
    return {
      x: item[0],
      y: item[1].toFixed(8),
    }
  })

  return data

  // return [
  //   {
  //     data,
  //     borderColor: '#ffee00',
  //     cubicInterpolationMode: 'monotone',
  //     tension: 0.4,
  //   },
  // ]
})

onMounted(() => {
  if (canvasRef && canvasRef.value) {
    new Chart(canvasRef.value, {
      type: 'line',
      data: {
        datasets: [
          {
            data: chartData.value,
            tension: 0.4,
            borderColor: '#00aa00',
            cubicInterpolationMode: 'monotone',
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || ''

                if (label) {
                  label += ': '
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 8,
                  }).format(context.parsed.y)
                }
                return label
              },
            },
          },
        },
        scales: {
          xAxis: {
            display: false,
            type: 'time',
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
