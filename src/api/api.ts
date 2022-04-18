export async function getCoins() {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const json = await response.json();
  return json;
}

export async function getInfoData(coinID: string) {
  const infoData = await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${coinID}`)
  ).json();
  return infoData;
}
export async function getPriceData(coinID: string) {
  const priceData = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinID}`)
  ).json();
  return priceData;
}
