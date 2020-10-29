import { CryptoItem } from '../store/types';

const basicRoot = 'https://api.coingecko.com/api/v3';

const getCrypto = (): Promise<CryptoItem[]> => {
  return fetch(`${basicRoot}/coins/markets?vs_currency=usd`).then((response) => response.json());
};

export { getCrypto };
