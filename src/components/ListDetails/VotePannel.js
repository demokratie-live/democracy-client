import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 132;
  background-color: rgba(250, 250, 250, 0.9);
`;

const CircleButton = styled.TouchableOpacity.attrs({
  onPress: () => () => Alert.alert('du hast nun abgestimmt'),
})`
  width: 87.5;
  height: 87.5;
  border-radius: 50;
  border-width: 1;
`;

const YesButton = styled(CircleButton)`
  border-color: #44db5e;
  background-color: rgb(68, 219, 94);
`;
const NoButton = styled(CircleButton)`
  border-color: #fe3824;
  background-color: rgb(254, 56, 36);
`;
const AbstentionButton = styled(CircleButton)`
  width: 63.5;
  height: 63.5;
  border-color: rgba(0, 118, 255, 0.71);
  background-color: rgba(0, 118, 255, 0.71);
`;

export default () => (
  <Wrapper>
    <YesButton />
    <AbstentionButton />
    <NoButton />
  </Wrapper>
);
