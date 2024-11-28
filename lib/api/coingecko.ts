import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export interface CoinHistory {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export const getTopCoins = async (limit: number = 100): Promise<Coin[]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false`
    );
    return response.data;
  } catch {
    return [];
  }
};

export const getCoinHistory = async (
  coinId: string,
  days: string = '7'
): Promise<CoinHistory> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
    return response.data;
  } catch {
    return { prices: [], market_caps: [], total_volumes: [] };
  }
};

export const searchCoins = async (query: string): Promise<Coin[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${query}&order=market_cap_desc&per_page=10&sparkline=false`
    );
    if (response.data.length > 0) {
      return response.data;
    }

    const searchResponse = await axios.get(
      `${COINGECKO_API}/search?query=${query}`
    );
    
    const coinIds = searchResponse.data.coins
      .slice(0, 10)
      .map((coin: any) => coin.id)
      .join(',');

    if (!coinIds) return [];

    const detailsResponse = await axios.get(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false`
    );

    return detailsResponse.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};