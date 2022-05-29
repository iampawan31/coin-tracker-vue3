import { defineStore } from 'pinia'
import { getCoinList } from '../API/index'
import { CoinType } from '../utils/types'

interface CoinState {
  coins: Array<CoinType>
  loading: boolean
  error: string | null | unknown
}

export const useCoinStore = defineStore({
  id: 'coin',
  state: (): CoinState => ({
    coins: [],
    loading: false,
    error: '',
  }),
  getters: {
    getCoins: (state) => state.coins,
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
        const coins = await getCoinList(vsCurrency, coinList, priceChange)
        this.coins = coins
        this.loading = false
      } catch (error: unknown) {
        this.error = error
        this.loading = false
      }
    },
  },
})
