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

export const ButtonTexts = {
  next: 'Weiter',
  finish: 'Überspringen',
  verified: 'Los gehts!',
};

interface Props {
  text: keyof typeof ButtonTexts;
  click: () => void;
}

const Header: React.FC<Props> = ({ text, click }) => (
  <>
    <Button onPress={click}>
      <ButtonText>{ButtonTexts[text]}</ButtonText>
    </Button>
  </>
);

export default Header;
