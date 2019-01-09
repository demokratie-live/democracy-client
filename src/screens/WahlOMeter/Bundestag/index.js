import React from 'react';
import styled from 'styled-components/native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// Components
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PieChart from './PieChart';

// GraphQL
import VOTES_LOCAL from '../../../graphql/queries/votesLocalKeyStore';
import PROCEDURES_WITH_VOTE_RESULTS from '../../../graphql/queries/proceduresWithVoteResults';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
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
                return <NoVotesPlaceholder subline="Bundestag" navigator={navigator} />;
              }
              let chartDataRaw = votedProcedures.proceduresWithVoteResults.map(
                ({ voteResults, procedureId }) => ({
                  government: voteResults.yes >= voteResults.no ? 'YES' : 'NO',
                  me: data.votesLocalKeyStore.find(({ procedureId: pid }) => pid === procedureId)
                    .selection,
                }),
              );
              const chartData = chartDataRaw.reduce(
                (pre, { government, me }) => {
                  if (
                    (me === 1 && government === 'YES') ||
                    (me === 2 && government === 'ABSTINATION') ||
                    (me === 3 && government === 'NO')
                  ) {
                    return { ...pre, matches: pre.matches + 1, count: pre.count + 1 };
                  } else {
                    return { ...pre, diffs: pre.diffs + 1, count: pre.count + 1 };
                  }
                },
                { matches: 0, diffs: 0, count: 0 },
              );

              return (
                <PieChart
                  data={chartData}
                  colorScale={['#EAA844', '#B1B3B4']}
                  label="Wahl-⦻-Meter"
                />
              );
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
