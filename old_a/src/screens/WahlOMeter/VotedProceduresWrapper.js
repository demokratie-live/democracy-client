import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Navigator } from 'react-native-navigation';
import { unionBy } from 'lodash';

// Components
import ListItem from '../VoteList/ListItem';
import NoVotesPlaceholder from './NoVotesPlaceholder';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';
import VOTES_SELECTION_LOCAL from '../../graphql/queries/local/votesSelection';
import ListLoading from '../../components/ListLoading';

const Wrapper = styled.FlatList`
  background-color: #fff;
`;

const VotedProceduresWrapper = ({ onProcedureListItemClick, children, navigator }) => {
  let hasMore = true;
  return (
    <Query query={VOTES_SELECTION_LOCAL} fetchPolicy="network-only">
      {({ data: localVotes }) => {
        if (!localVotes.votesSelectionLocal || localVotes.votesSelectionLocal.length === 0) {
          return <NoVotesPlaceholder subline="Bundestag" navigator={navigator} />;
        }
        return (
          <Query
            query={PROCEDURES_WITH_VOTE_RESULTS}
            variables={{
              procedureIds: localVotes.votesSelectionLocal.map(({ procedureId }) => procedureId),
              pageSize: 999999,
            }}
            fetchPolicy="cache-and-network"
          >
            {({ data: proceduresData }) => {
              let totalProcedures = 0;
              if (proceduresData && proceduresData.proceduresByIdHavingVoteResults) {
                totalProcedures = proceduresData.proceduresByIdHavingVoteResults.total;

                return (
                  <Query
                    query={PROCEDURES_WITH_VOTE_RESULTS}
                    variables={{ procedureIds: null, offset: 0, limit: 10 }}
                    fetchPolicy="cache-and-network"
                  >
                    {({ data: procedurListData, fetchMore, networkStatus }) => {
                      const listData =
                        procedurListData &&
                        procedurListData.proceduresByIdHavingVoteResults &&
                        procedurListData.proceduresByIdHavingVoteResults.procedures
                          ? procedurListData.proceduresByIdHavingVoteResults.procedures
                          : [];
                      return (
                        <Wrapper
                          data={['chart', ...listData]}
                          renderItem={({ item }) =>
                            item === 'chart' ? (
                              children({
                                totalProcedures,
                                chartData: { votedProcedures: proceduresData, localVotes },
                              })
                            ) : (
                              <ListItem
                                item={item}
                                onClick={() => onProcedureListItemClick({ item })}
                              />
                            )
                          }
                          ListFooterComponent={() => (networkStatus === 3 ? <ListLoading /> : null)}
                          onEndReached={() =>
                            hasMore &&
                            listData.length > 0 &&
                            fetchMore({
                              variables: {
                                offset:
                                  procedurListData.proceduresByIdHavingVoteResults.procedures
                                    .length,
                              },
                              updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                if (
                                  hasMore &&
                                  fetchMoreResult.proceduresByIdHavingVoteResults.procedures
                                    .length === 0
                                )
                                  hasMore = false;
                                prev.proceduresByIdHavingVoteResults.procedures;
                                return Object.assign({}, prev, {
                                  proceduresByIdHavingVoteResults: {
                                    ...prev.proceduresByIdHavingVoteResults,
                                    procedures: unionBy(
                                      prev.proceduresByIdHavingVoteResults.procedures,
                                      fetchMoreResult.proceduresByIdHavingVoteResults.procedures,
                                      '_id',
                                    ),
                                  },
                                });
                              },
                            })
                          }
                          keyExtractor={({ procedureId }) => (procedureId ? procedureId : 'chart')}
                        />
                      );
                    }}
                  </Query>
                );
              }
              return <ListLoading />;
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
