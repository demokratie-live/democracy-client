import React from 'react';
import styled from 'styled-components/native';

const CenteredWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Centered: React.FC = ({ children }) => {
  return <CenteredWrapper>{children}</CenteredWrapper>;
};
