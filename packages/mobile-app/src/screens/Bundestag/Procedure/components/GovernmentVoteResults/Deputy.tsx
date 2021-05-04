import React, { useContext } from 'react';
import { Platform } from 'react-native';
import {
  DeputyVoteResults,
  DeputyVoteResultsVariables,
} from './graphql/query/__generated__/DeputyVoteResults';
import { useQuery } from '@apollo/client';

// Components
import PartyComponent from './Parties';
import InfoIconComponent from '@democracy-deutschland/mobile-ui/src/components/Icons/Info';

// GraphQl
import { DEPUTY_VOTE_RESULT } from './graphql/query/deputyVoteResults';
import { ConstituencyContext } from '../../../../../context/Constituency';
import { useNavigation } from '@react-navigation/core';
import { styled } from '../../../../../styles';

const Wrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const InfoIconButton = styled.TouchableOpacity``;

const InfoIcon = styled(InfoIconComponent).attrs(() => ({
  width: 18,
  height: 18,
  color: 'rgb(199, 199, 204)',
}))`
  margin-left: ${({ theme }) => theme.distances.small}px;
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 20px;
`;

const NameWrapper = styled.View`
  align-items: center;
`;

const MemberImageWrapper = styled.TouchableOpacity`
  width: 200px;
  height: 275px;
  align-items: center;
  padding-bottom: 8px;
`;

const MemberImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: 175px;
  width: 200px;
  border-radius: 100px;
  border-width: ${() => (Platform.OS === 'ios' ? 1 : 0)}px;
  border-color: lightgray;
`;

const Party = styled(PartyComponent)`
  position: absolute;
  right: 0px;
  bottom: 30px;
`;

const Text = styled.Text`
  font-size: 15px;
`;

const TextLighGrey = styled(Text)`
  color: ${({ theme }) => theme.textColors.secondary};
`;

const Decision = styled.Text<{ decision: string | null }>`
  font-size: 21px;
  padding-top: 14px;
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
  const navigation = useNavigation();
  const { constituency } = useContext(ConstituencyContext);
  const { data, error } = useQuery<
    DeputyVoteResults,
    DeputyVoteResultsVariables
  >(DEPUTY_VOTE_RESULT, {
    variables: {
      constituencies: [constituency],
      procedureId: procedureId,
    },
  });

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

    return (
      <Wrapper>
        <MemberImageWrapper
          onPress={() => {
            navigation.navigate('MemberProfil');
          }}>
          <MemberImage source={{ uri: imgURL }} />
          <Party party={party} />
        </MemberImageWrapper>
        <DeputyDetailsWrapper>
          <NameWrapper>
            <Text>{name}</Text>
            <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
          </NameWrapper>
          <InfoIconButton onPress={() => navigation.navigate('MemberProfil')}>
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
