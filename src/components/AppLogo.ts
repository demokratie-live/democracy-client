import styled from 'styled-components/native';
import SvgIconappios from './Icons/IconAppIos';

const size = 100;

export const AppLogo = styled(SvgIconappios).attrs(({ width, height }) => ({
  width: width ?? size,
  height: height ?? size,
}))``;
