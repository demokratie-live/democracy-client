import React from 'react';
import styled from 'styled-components/native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// Components
import NoVotesPlaceholder from '../NoVotesPlaceholder';

// GraphQL
import VOTES_LOCAL from '../../../graphql/queries/votesLocalKeyStore';
import PROCEDURES_WITH_VOTE_RESULTS from '../../../graphql/queries/proceduresWithVoteResults';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Debug = styled.Text`
  color: #000;
`;

const Bundestag = ({ navigator }) => (
  <Wrapper>
    <Query query={VOTES_LOCAL} fetchPolicy="network-only">
      {({ data }) => {
        if (!data.votesLocalKeyStore || data.votesLocalKeyStore.length === 0) {
          return <NoVotesPlaceholder subline="Bundestag" navigator={navigator} />;
        }
        return (
          <Query
            query={PROCEDURES_WITH_VOTE_RESULTS}
            variables={{
              procedureIds: data.votesLocalKeyStore.map(({ procedureId }) => procedureId),
            }}
            fetchPolicy="cache-and-network"
          >
            {({ data: votedProcedures }) => {
              if (
                !votedProcedures.proceduresWithVoteResults ||
                votedProcedures.proceduresWithVoteResults.length === 0
              ) {
                console.log('VOTES_LOCAL QUERY', votedProcedures.proceduresWithVoteResults);
                return <NoVotesPlaceholder subline="Bundestag" navigator={navigator} />;
              }
              const chartData = votedProcedures.proceduresWithVoteResults.map(
                ({ voteResults, procedureId }) => ({
                  government: voteResults.yes >= voteResults.no ? 'YES' : 'NO',
                  me: data.votesLocalKeyStore.find(({ procedureId: pid }) => pid === procedureId)
                    .selection,
                }),
              );
              return <Debug>{JSON.stringify(chartData)}</Debug>;
            }}
          </Query>
        );
      }}
    </Query>
  </Wrapper>
);

Bundestag.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Bundestag;
