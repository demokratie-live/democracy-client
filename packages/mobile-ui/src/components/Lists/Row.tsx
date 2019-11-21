import React from 'react';
import styled from 'styled-components/native';

const RowWrapper = styled.TouchableHighlight.attrs({
  underlayColor: 'rgba(68, 148, 211, 0.1)',
})`
  padding-vertical: 14;
  padding-left: 8;
  padding-right: 14;
  border-bottom-color: #c8c7cc;
  border-bottom-width: 1;
`;

interface Props {
  onPress: () => void;
}

const Row: React.FC<Props> = ({ children, onPress }) => (
  <RowWrapper onPress={onPress}>{children}</RowWrapper>
);

export { Row };
