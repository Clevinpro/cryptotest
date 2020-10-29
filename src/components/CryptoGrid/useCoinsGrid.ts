import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setErrorAction } from '../../shared/store/actions';
import { CryptoItem } from '../../shared/store/types';
import { lsGetItem } from '../../shared/utils';

interface ViewType {
  title: string;
  value: string;
}

interface ViewTypes {
  [key: string]: ViewType;
}

const VIEW_TYPES: ViewTypes = {
  FAVORITES: {
    title: 'Favorites',
    value: 'favorites',
  },
  ALL: {
    title: 'All',
    value: 'all',
  },
};

interface State {
  sortedInfo: any;
  filteredInfo: any;
  searchQuery: string | null;
  favorites: CryptoItem[];
  activeViewType: string;
}

const INITIAL: State = {
  sortedInfo: {},
  filteredInfo: {},
  searchQuery: null,
  favorites: [],
  activeViewType: 'all',
};

const useCoinsGrid = (data: CryptoItem[]) => {
  const [state, setState] = useState(INITIAL);
  const dispatch = useDispatch();
  const { searchQuery, favorites, activeViewType } = state;
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState((prev) => ({
      ...prev,
      filteredInfo: filters,
      sortedInfo: sorter,
    }));
  };

  const clearAll = () => {
    setState((prev) => ({
      ...prev,
      filteredInfo: {},
      sortedInfo: {},
      searchQuery: null,
    }));
  };

  const handleSearch = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setState((prev) => ({
      ...prev,
      searchQuery: target.value,
    }));
  };

  const handleFavorites = (favorite: CryptoItem) => {
    const localFavorites: CryptoItem[] = lsGetItem('favorites');
    const favoritesIds = localFavorites ? localFavorites.map((fav) => fav.id) : [];
    const isUnique = !favoritesIds.includes(favorite.id);
    if (isUnique) {
      setState((prev) => ({
        ...prev,
        favorites: [...prev.favorites, favorite],
      }));
    } else {
      dispatch(
        setErrorAction({
          id: Date.now(),
          message: `Sorry, but "${favorite.name}" already in favorites`,
          description: 'Please, chose another one for adding to favorites',
          type: 'warning',
          isOpen: true,
        }),
      );
    }
  };

  const handleChangeViewList = (activeViewType: string) => {
    setState((prev) => ({
      ...prev,
      activeViewType,
    }));
  };

  useEffect(() => {
    const localFavorites = lsGetItem('favorites');

    if (localFavorites) {
      setState((prev) => ({
        ...prev,
        favorites: localFavorites,
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const { sortedInfo, filteredInfo } = state;

  const viewTypesItems = Object.values(VIEW_TYPES);
  const isFavoritesViewType = activeViewType === 'favorites';
  const currentDate: CryptoItem[] = isFavoritesViewType ? favorites : data;

  const filteredCrypto = searchQuery
    ? currentDate.filter((currency) => {
        return (
          currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          currency.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : currentDate;
  return {
    activeViewType,
    sortedInfo,
    filteredInfo,
    viewTypesItems,
    filteredCrypto,
    handleChange,
    clearAll,
    handleSearch,
    handleChangeViewList,
    handleFavorites,
  };
};

export default useCoinsGrid;
