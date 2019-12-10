import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40;
`;

interface Props {
  onPress: () => void;
}

export const IntroButton: React.FC<Props> = ({ children, onPress }) => (
  <Button onPress={onPress}>{children}</Button>
);
