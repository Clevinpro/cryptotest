import React from 'react';
import { Table, Button, Space, Input } from 'antd';
import { useColumns } from './useColumns';
import styled from 'styled-components';
import useCoinsGrid from './useCoinsGrid';
import { CryptoItem } from '../../shared/store/types';
import CoinsGridShell from './CoinsGridShell';

const { Search } = Input;

const TableWrapper = styled.div`
  max-width: 930px;
  margin: 0 auto;
`;

interface Props {
  data: CryptoItem[];
  loading: boolean;
}

const CoinsGrid: React.FC<Props> = ({ data, loading }) => {
  const {
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
  } = useCoinsGrid(data);

  const columns: any = useColumns(filteredInfo, sortedInfo, handleFavorites);

  return (
    <TableWrapper>
      {loading ? (
        <CoinsGridShell />
      ) : (
        <>
          <Space style={{ marginBottom: 16 }}>
            {viewTypesItems.map((viewType, indx) => (
              <Button
                disabled={activeViewType === viewType.value}
                key={`viewButton-${indx}`}
                onClick={() => handleChangeViewList(viewType.value)}
              >
                {viewType.title}
              </Button>
            ))}

            <Search
              placeholder="input search text"
              allowClear
              onChange={handleSearch}
              style={{ width: 200, margin: '0 10px' }}
            />
            <Button onClick={clearAll}>Clear filters</Button>
          </Space>
          <Table loading={loading} columns={columns} dataSource={filteredCrypto} onChange={handleChange} />
        </>
      )}
    </TableWrapper>
  );
};

export default CoinsGrid;
