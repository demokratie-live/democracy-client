import React from 'react';

import { Platform, ImageSourcePropType } from 'react-native';
import { styled } from '../../../../mobile-app/src/styles';

const ContainerHead = styled.View``;

const ContainerText = styled.View`
  align-items: center;
  z-index: 100;
`;

const Image = styled.Image`
  width: 65;
  height: 65;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22;
  padding-top: 15;
  /* font-family: ${
    Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'
  }; */
`;

const TextSub = styled.Text`
  color: ${({ theme }) => theme.textColors.secondary};
  font-size: 15;
  padding-top: 1;
  /* font-family: ${
    Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'
  }; */
  text-align: center;
  margin-bottom: 18;
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
