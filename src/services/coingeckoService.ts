interface CryptoData {
  [key: string]: {
    price: number;
    change_24h: number;
    volume: number;
    marketCap: number;
    symbol: string;
  };
}

export const fetchCryptoData = async (): Promise<CryptoData> => {
  const API_URL = process.env.REACT_APP_COINGECKO_API_URL;
  const API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;
  const CRYPTO_IDS = process.env.REACT_APP_COINGECKO_CRYPTO_IDS;

  if (!API_URL || !API_KEY || !CRYPTO_IDS) {
    throw new Error("Required environment variables are missing");
  }

  const params = new URLSearchParams({
    vs_currency: "usd",
    ids: CRYPTO_IDS,
    order: "market_cap_desc",
    per_page: "20",
    page: "1",
    sparkline: "false",
    price_change_percentage: "24h",
    x_cg_api_key: API_KEY,
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.reduce((acc: CryptoData, item: any) => {
      acc[item.id] = {
        price: item.current_price,
        change_24h: item.price_change_percentage_24h || 0,
        volume: item.total_volume || 0,
        marketCap: item.market_cap || 0,
        symbol: item.symbol.toUpperCase(),
      };
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
