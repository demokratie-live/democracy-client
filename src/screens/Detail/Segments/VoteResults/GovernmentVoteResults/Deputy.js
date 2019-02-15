import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Query } from 'react-apollo';
import { Navigator } from 'react-native-navigation';

// Components
import PartyComponent from '../../../../../components/Parties';

// GraphQl
import GET_DEPUTY_VOTE_RESULT from '../../../../../graphql/queries/getDeputyVoteResultsByProcedure';
import GET_CONSTITUENCY from '../../../../../graphql/queries/local/constituency';

const Wrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const InfoIconButton = styled.TouchableOpacity`
  position: absolute;
  right: -18;
  top: 0;
`;

const InfoIcon = styled(Ionicons).attrs(() => ({
  size: 24,
  name: 'ios-information-circle-outline',
  color: 'rgb(199, 199, 204)',
}))``;

const MemberImageWrapper = styled.View`
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
  border-width: 1;
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

const Decision = styled.Text`
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

const getDecisionString = decision => {
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

const DeputyVoteData = ({ procedureId, navigator }) => (
  <Query query={GET_CONSTITUENCY} fetchPolicy="network-only">
    {({
      data: {
        constituency: { constituency },
      },
    }) => (
      <Query
        query={GET_DEPUTY_VOTE_RESULT}
        variables={{
          constituencies: [constituency],
          procedureId: procedureId,
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data }) => {
          if (data && data.procedure && data.procedure.voteResults.deputyVotes[0]) {
            const {
              decision,
              deputy: { constituency, imgURL, name, party },
            } = data.procedure.voteResults.deputyVotes[0];
            return (
              <Wrapper>
                <MemberImageWrapper>
                  <MemberImage source={{ uri: imgURL }} />
                  <Party party={party} />
                  <InfoIconButton
                    onPress={() =>
                      navigator.push({
                        screen: 'democracy.MemberProfil',
                        title: `Abgeordnetenprofil`,
                        backButtonTitle: '',
                        passProps: {
                          noMenu: true,
                        },
                      })
                    }
                  >
                    <InfoIcon />
                  </InfoIconButton>
                </MemberImageWrapper>
                <Text>{name}</Text>
                <TextLighGrey>Direktkadidat WK {constituency}</TextLighGrey>
                <Decision decision={decision}>{getDecisionString(decision)}</Decision>
              </Wrapper>
            );
          }
          return null;
        }}
      </Query>
    )}
  </Query>
);

DeputyVoteData.propTypes = {
  procedureId: PropTypes.string.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

DeputyVoteData.defaultProps = {};

export default DeputyVoteData;
