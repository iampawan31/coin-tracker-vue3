import { defineStore } from 'pinia'
import { getCoinById, getCoinList, getCoinMarketChart } from '../API/index'
import { CoinType, Coin } from '../utils/types'

interface AddCoinState {
  loading: boolean
  showModal: boolean
  error: string | null | unknown
}

export const useAddCoinStore = defineStore({
  id: 'addCoin',
  state: (): AddCoinState => ({
    loading: false,
    showModal: true,
    error: '',
  }),
  getters: {},
  actions: {
    toggleModal() {
      this.$patch({
        showModal: !this.showModal,
      })
    },
  },
})
