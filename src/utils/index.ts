import moment from 'moment'

export const getSparklineChartLabels = (): String[] => {
  const labels = []
  const initialDay = moment().subtract(7, 'days')

  for (let i = 0; i < 168; i++) {
    labels.push(initialDay.format('DD MMM HH:mm'))
    initialDay.add(1, 'hour')
  }

  return labels
}
