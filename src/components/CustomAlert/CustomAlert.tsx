import React, { useMemo } from 'react';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { ErrorProps } from '../../shared/store/types';
import { getErrorsState } from '../../shared/selectors/appSelectors';
import styled from 'styled-components';

const AlertsWrapper = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 360px;
`;

const CustomAlert: React.FC = () => {
  const errors = useSelector(getErrorsState);
  const filtered = useMemo(() => errors.filter((err: ErrorProps) => err.isOpen), [errors]);
  console.log('filtered', filtered);

  return (
    <>
      {filtered.length > 0 && (
        <AlertsWrapper>
          {filtered.map((alert, inx) => (
            <Alert
              key={`alert-${inx}`}
              message={alert.message}
              description={alert.description || ''}
              type={alert.type}
              showIcon
            />
          ))}
        </AlertsWrapper>
      )}
    </>
  );
};

export default CustomAlert;
