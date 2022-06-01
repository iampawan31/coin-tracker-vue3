import { defineStore } from 'pinia'
import { getCoinById, getCoinList } from '../API/index'
import { CoinType, Coin } from '../utils/types'

interface CoinState {
  coins: Array<CoinType>
  coin: Coin
  loading: boolean
  error: string | null | unknown
}

export const useCoinStore = defineStore({
  id: 'coin',
  state: (): CoinState => ({
    coins: [] as Array<CoinType>,
    coin: {} as Coin,
    loading: false,
    error: '',
  }),
  getters: {
    getCoins: (state) => state.coins,
    getCoin: (state) => state.coin,
  },
  actions: {
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
        this.loading = false
      } catch (error: unknown) {
        this.error = error
        this.loading = false
      }
    },
    async fetchCoinById(coinId: string| string[]) {
      this.coin = {} as Coin
      this.loading = true
      this.error = null
      try {
        this.coin = await getCoinById(coinId)
        this.loading = false
      } catch (error: unknown) {
        this.error = error
        this.loading = false
      }
    },
  },
})
