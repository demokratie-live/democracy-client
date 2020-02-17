import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Background } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Background';
import { Header } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Header';
import DrawerItemList from './DrawerItemList';
import { RootStackParamList } from '../../routes';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { InitialStateContext } from '../../context/InitialStates';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '../../routes/Sidebar';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;
type SidebarNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Sidebar'>,
  DrawerNavigationProp<SidebarParamList>
>;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar: React.FC<Props> = props => {
  const navigation = useNavigation<SidebarNavigationProps>();
  const { isVerified, verificationQueryRunning } = useContext(
    InitialStateContext,
  );
  const handleHeaderClick = () => {
    if (isVerified) {
      navigation.navigate('Settings');
    } else {
      navigation.navigate('Verification');
    }
  };

  const headerLabel = verificationQueryRunning
    ? 'verbindet…'
    : isVerified
    ? 'verifizierter Nutzer'
    : 'unverifizierter Nutzer';

  return (
    <Container>
      <Background />
      <SafeAreaView>
        <Header onPress={handleHeaderClick} label={headerLabel} />
        <DrawerItemList {...props} />
      </SafeAreaView>
    </Container>
  );
};
