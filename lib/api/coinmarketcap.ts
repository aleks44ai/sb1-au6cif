import axios from 'axios';

const CMC_API_KEY = '57aa7758-bec9-4250-89c6-e604a832ef6d';
const CMC_API = 'https://pro-api.coinmarketcap.com/v1';

export interface CMCCoin {
  id: string;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

export const getTopCoinsCMC = async (limit: number = 100): Promise<CMCCoin[]> => {
  try {
    const response = await axios.get(
      `${CMC_API}/cryptocurrency/listings/latest?limit=${limit}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('CMC API Error:', error);
    return [];
  }
};

export const searchCoinsCMC = async (query: string): Promise<CMCCoin[]> => {
  try {
    const response = await axios.get(
      `${CMC_API}/cryptocurrency/listings/latest?limit=2000`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': CMC_API_KEY,
        },
      }
    );
    
    return response.data.data.filter((coin: CMCCoin) => 
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
  } catch (error) {
    console.error('CMC Search Error:', error);
    return [];
  }
};