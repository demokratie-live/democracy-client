import React from 'react';
import { DrawerItemList } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { Background } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Background';
import { HeadLogo } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/HeadLogo';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar = (props: Props) => (
  <Container>
    <Background />
    <SafeAreaView>
      <HeadLogo />
      <DrawerItemList {...props} />
    </SafeAreaView>
  </Container>
);
