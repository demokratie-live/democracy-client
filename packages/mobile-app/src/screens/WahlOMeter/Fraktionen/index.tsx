import React from 'react';
import { ScreenNavigationProp } from '../../../routes/Sidebar/WahlOMeter/TabView';
import { WomPartyProvider } from './context';
import WomPartyList from './WomPartyList';
import { styled } from '../../../styles';
import { VotedPartyProcedures_procedurecForWomPartyList_procedures } from './graphql/queries/__generated__/VotedPartyProcedures';

const Container = styled.View`
  background-color: #fff;
  flex-grow: 1;
`;

interface Props {
  navigation: ScreenNavigationProp;
}

export const WomParty: React.FC<Props> = ({ navigation }) => {
  const onProcedureListItemClick = ({
    item,
  }: {
    item: VotedPartyProcedures_procedurecForWomPartyList_procedures;
  }) =>
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
