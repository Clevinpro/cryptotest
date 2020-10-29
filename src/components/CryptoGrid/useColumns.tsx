import React from 'react';
import { Button, Popconfirm } from 'antd';
import styled from 'styled-components';
import { CryptoItem } from '../../shared/store/types';

const Img = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: -20px;
  top: -10px;
`;

const TableItem = styled.div`
  position: relative;
  display: inline-block;
`;

interface HandleFavorites {
  (favorite: CryptoItem): void;
}

export const useColumns = (filteredInfo: any, sortedInfo: any, handleFavorites: HandleFavorites) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filters: [
      { text: 'Bitcoin', value: 'Bitcoin' },
      { text: 'Ethereum', value: 'Ethereum' },
    ],
    filteredValue: filteredInfo.name || null,
    onFilter: (value: string, record: CryptoItem) => record.name.includes(value),
    sorter: (a: CryptoItem, b: CryptoItem) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    ellipsis: true,
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
    render: (value: string, record: CryptoItem) => (
      <TableItem>
        {value}
        <Img src={record.image} alt="" />
      </TableItem>
    ),
    ellipsis: true,
  },
  {
    title: 'Price',
    dataIndex: 'current_price',
    key: 'current_price',
    sorter: (a: CryptoItem, b: CryptoItem) => a.current_price - b.current_price,
    sortOrder: sortedInfo.columnKey === 'current_price' && sortedInfo.order,
    ellipsis: true,
  },
  {
    title: '',
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: (text: string, record: CryptoItem) => (
      <Popconfirm title={`Save ${record.name} to Favorites?`} onConfirm={() => handleFavorites(record)}>
        <Button>Add to Favorites</Button>
      </Popconfirm>
    ),
  },
];
