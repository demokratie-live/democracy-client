import React from 'react';
import styled from 'styled-components/native';
import { HeadLogo } from './HeadLogo';
import { ActivityIndicator } from 'react-native';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 16;
  padding-left: 16;
  padding-bottom: 8;
`;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17;
  padding-left: 16;
`;

interface Props {
  onPress: () => void;
  label: string;
}

export const Header: React.FC<Props> = ({ onPress, label }) => (
  <Container onPress={onPress}>
    {label !== 'verbindet…' && <HeadLogo />}
    {label === 'verbindet…' && <ActivityIndicator size="large" />}
    <HeadTextWrapper>
      <HeadText>{label}</HeadText>
    </HeadTextWrapper>
  </Container>
);
