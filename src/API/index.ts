export const getCoinList = async (
  vsCurrency: string,
  coinIds: string,
  priceChangePercentage: string
) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=${priceChangePercentage}&sparkline=true`

  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getCoinById = async (coinId: string | string[]) => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`

  const res = await fetch(url)
  const data = await res.json()

  return data
}

export const getCoinMarketChart = async (
  coinId: string | string[],
  vsCurrency: string,
  days: string
) => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`

  const res = await fetch(url)
  const data = await res.json()

  return data.prices
}

export const getCoinsByQueryString = async (queryString: string) => {
  const url = `https://api.coingecko.com/api/v3/search?query=${queryString}`

  const res = await fetch(url)
  const data = await res.json()

  return data.coins
}
