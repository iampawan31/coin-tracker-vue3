import { defineStore } from 'pinia'
import { getCoinById, getCoinList, getCoinMarketChart } from '../API/index'
import { CoinType, Coin } from '../utils/types'

const defaultCoins = [
  'shiba-inu',
  'siacoin',
  'bittorrent',
  'spell-token',
  'bitrise-token',
  'terra-luna',
  'floki-inu',
  'dogelon-mars',
  'starlink',
  'safemoon-2',
  'baby-doge-coin',
  'saitama-inu',
  'kishu-inu',
  'bitcoin',
]

interface CoinState {
  coins: Array<CoinType>
  coin: Coin
  loading: boolean
  error: string | null | unknown
  coinChartDataLoading: boolean
  coinChartData: Array<any>
  favoriteCoins: Array<String>
}

export const useCoinStore = defineStore({
  id: 'coin',
  state: (): CoinState => ({
    coins: [] as Array<CoinType>,
    coin: {} as Coin,
    loading: false,
    error: '',
    coinChartDataLoading: false,
    coinChartData: [],
    favoriteCoins: [] as Array<String>,
  }),
  getters: {
    getCoins: (state) => state.coins,
    getCoin: (state) => state.coin,
  },
  actions: {
    addFavoriteCoin(coin: string) {
      this.favoriteCoins.push(coin)
    },
    addFavoriteCoins(coins: Array<String> = defaultCoins) {
      this.favoriteCoins = coins
      localStorage.setItem('favoriteCoins', JSON.stringify(coins))
    },
    async fetchCoins(
      vsCurrency: string,
      coinList: string,
      priceChange: string
    ) {
      this.coins = []
      this.loading = true
      this.error = null
      try {
        this.coins = await getCoinList(vsCurrency, coinList, priceChange)
      } catch (error: unknown) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchCoinById(coinId: string | string[]) {
      this.coin = {} as Coin
      this.loading = true
      this.error = null
      try {
        this.coin = await getCoinById(coinId)
      } catch (error: unknown) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchCoinChartData(
      coinId: string | string[],
      vsCurrency: string,
      days: string
    ) {
      try {
        this.coinChartDataLoading = true
        this.coinChartData = await getCoinMarketChart(coinId, vsCurrency, days)
      } catch (error) {
        this.error = error
      } finally {
        this.coinChartDataLoading = false
      }
    },
  },
})
