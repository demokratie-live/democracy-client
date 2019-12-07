import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Background } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Background';
import { Header } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Header';
import DrawerItemList from './DrawerItemList';
import { RootStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/core';
import { InitialStateContext } from '../../context/InitialStates';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;
type SidebarNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Sidebar'
>;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar: React.FC<Props> = props => {
  const navigation = useNavigation<SidebarNavigationProps>();
  const { isVerified } = useContext(InitialStateContext);
  const handleHeaderClick = () => {
    if (isVerified) {
      Alert.alert('add correct navigation');
    } else {
      navigation.navigate('Verification');
    }
  };
  return (
    <Container>
      <Background />
      <SafeAreaView>
        <Header
          onPress={handleHeaderClick}
          label={isVerified ? 'verifizierter Nutzer' : 'unverifizierter Nutzer'}
        />
        <DrawerItemList {...props} />
      </SafeAreaView>
    </Container>
  );
};
