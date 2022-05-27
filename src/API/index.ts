export const getCoinList = async (
  vsCurrency: string,
  coinIds: string,
  priceChangePercentage: string
) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=${priceChangePercentage}`

  const res = await fetch(url)
  const data = await res.json()
  return data
}
