import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  DeputyVoteResults,
  DeputyVoteResultsVariables,
} from './graphql/query/__generated__/DeputyVoteResults';
import { useQuery } from '@apollo/react-hooks';

// Components
import PartyComponent from './Parties';
import InfoIconComponent from '@democracy-deutschland/mobile-ui/src/components/Icons/Info';

// GraphQl
import { DEPUTY_VOTE_RESULT } from './graphql/query/deputyVoteResults';

const Wrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const InfoIconButton = styled.TouchableOpacity``;

const InfoIcon = styled(InfoIconComponent).attrs(() => ({
  width: 24,
  height: 24,
  color: 'rgb(199, 199, 204)',
}))`
  padding-left: 9;
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 20;
`;

const NameWrapper = styled.View`
  align-items: center;
`;

const MemberImageWrapper = styled.TouchableOpacity`
  width: 200;
  height: 275;
  align-items: center;
  padding-bottom: 8;
`;

const MemberImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: 175;
  width: 200;
  border-radius: 100;
  border-width: ${() => (Platform.OS === 'ios' ? 1 : 0)};
  border-color: lightgray;
`;

const Party = styled(PartyComponent)`
  position: absolute;
  right: 0;
  bottom: 30;
`;

const Text = styled.Text`
  font-size: 15;
`;

const TextLighGrey = styled(Text)`
  color: #9b9b9b;
`;

const Decision = styled.Text<{ decision: string | null }>`
  font-size: 21;
  padding-top: 14;
  color: ${({ decision }) => {
    switch (decision) {
      case 'YES':
        return '#99c93e';
      case 'ABSTINATION':
        return '#4CB0D8';
      case 'NO':
        return '#D43194';

      default:
        return '#B1B3B4';
    }
  }};
`;

const getDecisionString = (decision: string | null) => {
  switch (decision) {
    case 'YES':
      return 'Zugestimmt';
    case 'ABSTINATION':
      return 'Enthalten';
    case 'NO':
      return 'Abgelehnt';

    default:
      return 'Nicht Abgestimmt';
  }
};

interface Props {
  procedureId: string;
}

const DeputyVoteData: React.FC<Props> = ({ procedureId }) => {
  const constituency = '103';
  const { data, loading, error } = useQuery<
    DeputyVoteResults,
    DeputyVoteResultsVariables
  >(DEPUTY_VOTE_RESULT, {
    variables: {
      constituencies: [constituency],
      procedureId: procedureId,
    },
  });
  console.log('SHOW CONSTITUENCY', { loading }, error, data);
  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (
    data &&
    data.procedure &&
    data.procedure.voteResults &&
    data.procedure.voteResults.deputyVotes &&
    data.procedure.voteResults.deputyVotes[0]
  ) {
    const {
      decision,
      deputy: { imgURL, name, party },
    } = data.procedure.voteResults.deputyVotes[0];
    console.log('SHOW CONSTITUENCY');
    return (
      <Wrapper>
        <MemberImageWrapper
          onPress={() => {
            // TODO navigate to abgeordnetenprofil
          }}>
          <MemberImage source={{ uri: imgURL }} />
          <Party party={party} />
        </MemberImageWrapper>
        <DeputyDetailsWrapper>
          <NameWrapper>
            <Text>{name}</Text>
            <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
          </NameWrapper>
          <InfoIconButton
            onPress={() => {
              // TODO Link to abgeordnetenprofil
            }}>
            <InfoIcon />
          </InfoIconButton>
        </DeputyDetailsWrapper>
        <Decision decision={decision}>{getDecisionString(decision)}</Decision>
      </Wrapper>
    );
  }
  return null;
};

export default DeputyVoteData;
