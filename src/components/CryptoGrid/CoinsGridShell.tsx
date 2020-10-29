import { List, Skeleton } from 'antd';
import React from 'react';

const CoinsGridShell = () => {
  return (
    <>
      <Skeleton.Button style={{ width: 100 }} active />
      <List
        itemLayout="vertical"
        size="large"
        dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={(item, indx) => (
          <List.Item key={`skeleton-${indx}`}>
            <Skeleton.Input style={{ width: 200, margin: '0px 10px' }} active size="large" />
            <Skeleton.Input style={{ width: 200, margin: '0px 10px' }} active size="large" />
            <Skeleton.Input style={{ width: 200, margin: '0px 10px' }} active size="large" />
            <Skeleton.Input style={{ width: 200, margin: '0px 10px' }} active size="large" />
          </List.Item>
        )}
      />
    </>
  );
};

export default CoinsGridShell;
