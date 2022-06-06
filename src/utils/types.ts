export type CoinType = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null
  last_updated: string
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
  sparkline_in_1h: {
    price: []
  }
  sparkline_in_24h: {
    price: []
  }
  sparkline_in_7d: {
    price: []
  }
  sparkline_in_14d: {
    price: []
  }
  sparkline_in_30d: {
    price: []
  }
  sparkline_in_1y: {
    price: []
  }
}

export type CoinChartType = Array<[Number, Number]>

export type CoinData = {
  legend: Object
  datasets: [Object]
}

export type Coin = {
  id: string
  symbol: string
  name: string
  description: {
    en: string
  }
  image: {
    thumb: string
    small: string
    large: string
  }
  market_cap_rank: number
  coingecko_rank: number
  coingecko_score: number
  developer_score: number
  community_score: number
  liquidity_score: number
  public_interest_score: number
  market_data: {
    current_price: {
      inr: number
    }
    ath: {
      inr: number
    }
    atl: {
      inr: number
    }
    price_change_24h: number
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_14d: number
    price_change_percentage_30d: number
    price_change_percentage_60d: number
    price_change_percentage_200d: number
    price_change_percentage_1y: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    price_change_24h_in_currency: Object
    price_change_percentage_1h_in_currency: Object
    price_change_percentage_24h_in_currency: Object
    price_change_percentage_7d_in_currency: Object
    price_change_percentage_14d_in_currency: Object
    price_change_percentage_30d_in_currency: Object
    price_change_percentage_60d_in_currency: Object
    price_change_percentage_200d_in_currency: Object
    price_change_percentage_1y_in_currency: Object
    market_cap_change_24h_in_currency: Object
    market_cap_change_percentage_24h_in_currency: Object
    total_volume: {
      inr: number
    }
    total_supply: number
    max_supply: number
    circulating_supply: number
    last_updated: string
  }
  status_updates: []
  last_updated: string
}
