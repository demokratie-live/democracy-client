import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const Loading = styled.View`
  height: 50;
  align-items: center;
  justify-content: center;
`;

const ListLoading = () => (
  <Loading>
    <ActivityIndicator />
  </Loading>
);

export default ListLoading;
