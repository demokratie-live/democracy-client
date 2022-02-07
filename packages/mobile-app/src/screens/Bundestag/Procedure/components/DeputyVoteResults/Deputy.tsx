import React from 'react';
import { DeputyVoteResults_procedure_voteResults_deputyVotes } from './graphql/query/__generated__/DeputyVoteResults';

// Components
import InfoIconComponent from '@democracy-deutschland/mobile-ui/src/components/Icons/Info';

// GraphQl
import { useNavigation } from '@react-navigation/core';
import { styled } from '../../../../../styles';
import { Avatar } from '@democracy-deutschland/ui';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../routes';

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
  padding-left: 80px;
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
  padding-bottom: 3px;
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

export const DeputyVoteResult: React.FC<DeputyVoteResults_procedure_voteResults_deputyVotes> = ({
  decision,
  deputy: { constituency, name, party, webId, imgURL },
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Wrapper key={webId}>
      <MemberImageWrapper
        onPress={() => {
          navigation.push('DeputyProfile', { id: webId });
        }}>
        <Avatar
          partyLogo={{
            party: party as any,
            width: 180,
          }}
          profileImage={{
            height: 268,
            variant: 'oval',
            source: { uri: imgURL },
          }}
        />
      </MemberImageWrapper>
      <DeputyDetailsWrapper>
        <NameWrapper>
          <Text>{name}</Text>
          <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
        </NameWrapper>
        <InfoIconButton
          onPress={() => navigation.push('DeputyProfile', { id: webId })}>
          <InfoIcon />
        </InfoIconButton>
      </DeputyDetailsWrapper>
      <Decision decision={decision}>{getDecisionString(decision)}</Decision>
    </Wrapper>
  );
};
