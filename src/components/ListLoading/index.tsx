import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const Loading = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`;

export const ListLoading = () => (
  <Loading>
    <ActivityIndicator />
  </Loading>
);
