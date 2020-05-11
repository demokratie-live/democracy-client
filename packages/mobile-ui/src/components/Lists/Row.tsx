import React from 'react';
import styled from 'styled-components/native';

const RowWrapper = styled.TouchableHighlight.attrs({
  underlayColor: 'rgba(68, 148, 211, 0.1)',
})`
  padding-vertical: 14;
  padding-horizontal: 18;
  border-bottom-color: #c8c7cc;
  border-bottom-width: 1;
`;

interface Props {
  onPress: () => void;
  testID?: string;
}

const Row: React.FC<Props> = ({ children, onPress, testID }) => (
  <RowWrapper onPress={onPress} testID={testID}>
    {children}
  </RowWrapper>
);

export { Row };
