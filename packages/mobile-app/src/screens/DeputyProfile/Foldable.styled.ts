import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import SvgArrow from '../../../../mobile-ui/src/components/Icons/Arrow';

export const Wrapper = styled.View`
  margin-top: 18px;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 4px;
  padding-horizontal: 18px;
`;

export const Headline = styled.Text`
  flex: 1;
  font-size: 17px;
  margin-right: 10px;
`;

interface CollapseIconProps extends SvgProps {
  open: boolean;
}

export const CollapseIcon = styled(SvgArrow).attrs(() => ({
  color: 'rgb(151, 151, 151)',
  width: 20,
  height: 20,
}))<CollapseIconProps>`
  align-self: flex-start;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #efeff4;
  margin-top: 9px;
`;

export const Content = styled.View<{ paddingHorizontal: number }>`
  padding-horizontal: ${({ paddingHorizontal }) => paddingHorizontal}px;
  padding-vertical: 8px;
`;
