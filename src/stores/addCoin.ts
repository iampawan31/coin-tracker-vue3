import { defineStore } from 'pinia'
import { getCoinsByQueryString } from '../API/index'
import { CoinType, Coin } from '../utils/types'

type CoinList = {
  id: string
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  large: string
}

interface AddCoinState {
  loading: boolean
  showModal: boolean
  error: string | null | unknown
  coinList: Array<CoinList>
  queryString: string
}

export const useAddCoinStore = defineStore({
  id: 'addCoin',
  state: (): AddCoinState => ({
    loading: false,
    showModal: false,
    error: '',
    coinList: [],
    queryString: '',
  }),
  getters: {},
  actions: {
    toggleModal() {
      this.$patch({
        showModal: !this.showModal,
        coinList: [],
        queryString: '',
        error: '',
        loading: false,
      })
    },
    async fetchCoinsUsingQueryString() {
      this.loading = true
      this.error = null
      try {
        this.coinList = await getCoinsByQueryString(this.queryString)
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },
  },
})
