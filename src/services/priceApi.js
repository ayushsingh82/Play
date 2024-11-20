import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const fetchMemeTokenPrices = async (tokenIds) => {
  try {
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: tokenIds.join(','),
        vs_currencies: 'usd'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
};

export const MEME_TOKENS = {
  DOGE: 'dogecoin',
  SHIB: 'shiba-inu',
  PEPE: 'pepe',
  FLOKI: 'floki'
}; 