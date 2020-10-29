import { Store } from './store/types';

const ROOT_STORE_INITIAL: Store = {
  crypto: {
    items: [],
    isLoaded: false,
  },
  app: {
    errors: [],
  },
};

export { ROOT_STORE_INITIAL };
