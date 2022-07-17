import React from 'react';

import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

const ContainerHead = styled.View``;

const ContainerText = styled.View`
  align-items: center;
  z-index: 100;
`;

const Image = styled.Image`
  width: 65px;
  height: 65px;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22px;
  padding-top: 15px;
`;

const TextSub = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 15px;
  padding-top: 1px;
  text-align: center;
  margin-bottom: 18px;
`;

interface Props {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const Header: React.FC<Props> = ({ image, title, description }) => (
  <>
    <ContainerHead>
      <Image source={image} />
    </ContainerHead>
    <ContainerText>
      <TextHead>{title}</TextHead>
      <TextSub>{description}</TextSub>
    </ContainerText>
  </>
);

export default Header;
