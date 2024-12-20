interface CryptoData {
  [key: string]: {
    price: number;
    change_1h: number;
    change_24h: number;
    change_7d: number;
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
    ids: CRYPTO_IDS,
    vs_currencies: "usd",
    include_24hr_change: "true",
    include_market_cap: "true",
    include_24hr_vol: "true",
    x_cg_api_key: API_KEY,
  });

  try {
    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return Object.entries(data).reduce(
      (acc: CryptoData, [key, value]: [string, any]) => {
        acc[key] = {
          price: value.usd,
          change_1h: 0, // Not available in simple price endpoint
          change_24h: value.usd_24h_change || 0,
          change_7d: 0, // Not available in simple price endpoint
          volume: value.usd_24h_vol || 0,
          marketCap: value.usd_market_cap || 0,
          symbol: key.substring(0, 3).toUpperCase(),
        };
        return acc;
      },
      {},
    );
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
