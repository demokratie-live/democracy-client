import React from 'react';
import { styled } from '../../../../mobile-app/src/styles';

const BackgroundWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.Image.attrs(() => ({
  source: require('../../assets/SidebarBackground.png'),
}))`
  resize-mode: cover;
  width: 100%;
  height: 100%;
  padding-horizontal: 1;
`;

const Overlay = styled.View`
  position: absolute;
  background-color: ${({ theme }) => `${theme.oldColors.background.header}33`};

  width: 100%;
  height: 100%;
`;

export const Background = () => (
  <BackgroundWrapper>
    <BackgroundImage />
    <Overlay />
  </BackgroundWrapper>
);
