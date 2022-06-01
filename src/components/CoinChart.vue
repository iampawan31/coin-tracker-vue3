<!-- <template>
  <div>
    <canvas ref="canvasRef" :id="coinId" width="250px" height="250px" />
  </div>
</template>

<script setup lang="ts">
import { Chart, ChartData, ChartItem, registerables } from 'chart.js'
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

const chartData: ChartData = computed(() => {
  const data = props.coinChart.map((item) => {
    return {
      x: item[0],
      y: item[1].toFixed(2),
    }
  })

  return [
    {
      data,
      borderColor: '#ffee00',
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    },
  ]
})

onMounted(() => {
  const ctx = document?.getElementById(props.coinId)?.getContext('2d')
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: chartData,
      },
      options: chartOptions,
    })
  }
})
</script> -->
