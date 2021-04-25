import React, { useEffect, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import ArrowIcon from '../Icons/Arrow';

const Wrapper = styled.View`
  margin-top: 11px;
  background-color: #fff;
  border-radius: 5px;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 4px;
  padding-horizontal: 18px;
`;

const Headline = styled.Text`
  flex: 1;
  font-size: 17px;
  margin-right: 10px;
`;

interface CollapseIconProps extends SvgProps {
  open: boolean;
}

const CollapseIcon = styled(ArrowIcon).attrs(() => ({
  color: 'rgb(151, 151, 151)',
  width: 20,
  height: 20,
}))<CollapseIconProps>`
  align-self: flex-start;
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const Divider = styled.View`
  height: 1px;
  background-color: #efeff4;
  margin-top: 9px;
`;

const Content = styled.View<{ paddingHorizontal: number }>`
  padding-horizontal: ${({ paddingHorizontal }) => paddingHorizontal}px;
  padding-vertical: 8px;
`;

interface Props {
  title: string;
  opened?: boolean;
  paddingHorizontal?: number;
}

const Folding: React.FC<Props> = ({
  title,
  opened = false,
  paddingHorizontal = 18,
  children,
}) => {
  const [open, setOpen] = useState(opened);

  useEffect(() => {
    setOpen(opened);
  }, [opened]);

  return (
    <Wrapper>
      <Header onPress={() => setOpen(!open)}>
        <Headline>{title}</Headline>
        <CollapseIcon open={open} />
      </Header>
      {open && (
        <>
          <Divider />
          <Content paddingHorizontal={paddingHorizontal}>{children}</Content>
        </>
      )}
      <Divider />
    </Wrapper>
  );
};

export default Folding;
