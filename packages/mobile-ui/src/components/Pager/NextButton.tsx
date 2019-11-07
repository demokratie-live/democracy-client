import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: #fcfcfc;
  height: 60;
  justify-content: center;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #0076ff;
  font-size: 20;
  line-height: 24;
`;

interface Props {
  text: string;
  click: () => void;
}

export const NextButton: React.FC<Props> = ({ text, click }) => (
  <>
    <Button onPress={click}>
      <ButtonText>{text}</ButtonText>
    </Button>
  </>
);
