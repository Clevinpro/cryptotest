export interface Store {
  crypto: CryptoState;
  app: AppState;
}

export interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}

export interface CryptoState {
  items: CryptoItem[];
  isLoaded: boolean;
}

export interface ErrorProps {
  id: number;
  message: string;
  type: 'warning';
  description?: string;
  isOpen: boolean;
}

export interface AppState {
  errors: ErrorProps[];
}
