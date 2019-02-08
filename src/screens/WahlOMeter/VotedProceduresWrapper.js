import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Navigator } from 'react-native-navigation';

// Components
import ListItem from '../VoteList/ListItem';
import NoVotesPlaceholder from './NoVotesPlaceholder';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';
import VOTES_SELECTION_LOCAL from '../../graphql/queries/local/votesSelection';

const Wrapper = styled.FlatList`
  background-color: #fff;
  padding-top: 18;
`;

const VotedProceduresWrapper = ({ onProcedureListItemClick, children, navigator }) => {
  return (
    <Query query={VOTES_SELECTION_LOCAL}>
      {({ data: localVotes }) => {
        if (!localVotes.votesSelectionLocal || localVotes.votesSelectionLocal.length === 0) {
          return <NoVotesPlaceholder subline="Bundestag" navigator={navigator} />;
        }
        return (
          <Query
            query={PROCEDURES_WITH_VOTE_RESULTS}
            variables={{ procedureIds: null, pageSize: 999999 }}
            fetchPolicy="cache-and-network"
          >
            {({ data: proceduresData }) => {
              let totalProcedures = 0;
              if (proceduresData && proceduresData.proceduresByIdHavingVoteResults) {
                totalProcedures = proceduresData.proceduresByIdHavingVoteResults.total;

                return (
                  <Wrapper
                    data={['chart', ...proceduresData.proceduresByIdHavingVoteResults.procedures]}
                    renderItem={({ item }) =>
                      item === 'chart' ? (
                        children({
                          totalProcedures,
                          chartData: { votedProcedures: proceduresData, localVotes },
                        })
                      ) : (
                        <ListItem item={item} onClick={() => onProcedureListItemClick({ item })} />
                      )
                    }
                    keyExtractor={({ procedureId }) => (procedureId ? procedureId : 'chart')}
                  />
                );
              }
              return null;
            }}
          </Query>
        );
      }}
    </Query>
  );
};

VotedProceduresWrapper.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  children: PropTypes.func.isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default VotedProceduresWrapper;
