import React, { useEffect, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import ArrowIcon from '../Icons/Arrow';

const Wrapper = styled.View`
  margin-top: 11;
  background-color: #fff;
  border-radius: 5;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 4;
  padding-horizontal: 18;
`;

const Headline = styled.Text`
  flex: 1;
  font-size: 17;
  margin-right: 10;
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
  height: 1;
  background-color: #efeff4;
  margin-top: 9;
`;

const Content = styled.View`
  padding-horizontal: 18;
  padding-vertical: 8;
`;

interface Props {
  title: string;
  opened?: boolean;
}

const Folding: React.FC<Props> = ({ title, opened = false, children }) => {
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
          <Content>{children}</Content>
        </>
      )}
      <Divider />
    </Wrapper>
  );
};

export default Folding;
