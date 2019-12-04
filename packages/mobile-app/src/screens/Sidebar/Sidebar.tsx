import React from 'react';
import styled from 'styled-components/native';
import { Background } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Background';
import { Header } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Header';
import DrawerItemList from './DrawerItemList';
import { RootStackParamList } from '../../routes';
import { RouteProp, useRoute } from '@react-navigation/core';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;
type SidebarScreenRouteProp = RouteProp<RootStackParamList, 'Sidebar'>;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar: React.FC<Props> = props => {
  const route = useRoute<SidebarScreenRouteProp>();
  const { registered } = route.params;
  return (
    <Container>
      <Background />
      <SafeAreaView>
        <Header
          onPress={() => {}}
          label={registered ? 'verifizierter Nutzer' : 'unverifizierter Nutzer'}
        />
        <DrawerItemList {...props} />
      </SafeAreaView>
    </Container>
  );
};
