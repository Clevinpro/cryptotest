import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CoinsGrid from '../components/CryptoGrid/CoinsGrid';
import { fetchCryptoAction } from '../shared/store/actions';
import { Store } from '../shared/store/types';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCryptoAction.request());
  }, [dispatch]);
  const crypto = useSelector((state: Store) => state.crypto);
  console.log('crypto', crypto);

  return (
    <div>
      <h1>Crypto searcher</h1>
      <CoinsGrid loading={!crypto.isLoaded} data={crypto.items} />
    </div>
  );
};

export default Main;
