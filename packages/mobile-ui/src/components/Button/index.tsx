import React from 'react';
import styled from 'styled-components/native';

enum BackgroundColors {
  transparent = 'transparent',
  blue = '#4494d3',
  lightBlue = '#9AC5E7',
  red = '#ec3e31',
}
interface ContainerProps {
  color: keyof typeof BackgroundColors;
}

const Container = styled.TouchableOpacity<ContainerProps>`
  background-color: ${({ color }) => BackgroundColors[color]};
  height: 60;
  justify-content: center;
  border-radius: 2;
`;

enum TextColors {
  blue = '#0076ff',
  white = '#fff',
  red = '#d0021b',
}

interface TextProps {
  color: keyof typeof TextColors;
}
const ButtonText = styled.Text<TextProps>`
  text-align: center;
  color: ${({ color }) => TextColors[color]};
  font-size: 20;
  line-height: 24;
`;

export interface Props {
  text: string;
  onPress: () => void;
  textColor: keyof typeof TextColors;
  backgroundColor?: keyof typeof BackgroundColors;
}

export const Button: React.FC<Props> = ({
  text,
  onPress,
  textColor,
  backgroundColor = 'transparent',
}) => (
  <Container testID="Button" onPress={onPress} color={backgroundColor}>
    <ButtonText testID="ButtonText" color={textColor}>
      {text}
    </ButtonText>
  </Container>
);
