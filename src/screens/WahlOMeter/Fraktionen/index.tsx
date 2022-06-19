import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../routes';
import { WomPartyProvider } from './context';
import WomPartyList, { WomPartyListProps } from './WomPartyList';

const Container = styled.View`
  background-color: #fff;
  flex-grow: 1;
`;

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sidebar'>;

interface Props {
  navigation: ScreenNavigationProp;
}

export const WomPartyScreen: React.FC<Props> = ({ navigation }) => {
  const onProcedureListItemClick: WomPartyListProps['onProcedureListItemClick'] = ({ item }) =>
    navigation.navigate('Procedure', {
      procedureId: item.procedureId,
      title: item.type || item.procedureId,
    });
  return (
    <Container>
      <WomPartyProvider>
        <WomPartyList onProcedureListItemClick={onProcedureListItemClick} />
      </WomPartyProvider>
    </Container>
  );
};
