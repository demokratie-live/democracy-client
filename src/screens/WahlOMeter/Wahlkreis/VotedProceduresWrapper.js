import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Navigator } from 'react-native-navigation';
import { unionBy } from 'lodash';
import { ActivityIndicator } from 'react-native';

// Components
import ListItem from '../../VoteList/ListItem';
import NoVotesPlaceholder from './../NoVotesPlaceholder';

// GraphQL
import GET_PROCEDURE_CHART_DATA from '../../../graphql/queries/getDeputyChartData';
import GET_DEPUTY_PROCEDURES from '../../../graphql/queries/getDeputyProcedures';
import VOTES_SELECTION_LOCAL from '../../../graphql/queries/local/votesSelection';
import GET_CONSTITUENCY from '../../../graphql/queries/local/constituency';
import VoteVarificationNoConstituency from '../../VoteVarification/NoConstituency';

const Wrapper = styled.FlatList`
  background-color: #fff;
`;

const Loading = styled.View`
  height: 50;
  align-items: center;
  justify-content: center;
`;

const VotedProceduresWrapper = ({ onProcedureListItemClick, children, navigator }) => {
  let hasMore = true;
  return (
    <Query query={GET_CONSTITUENCY} fetchPolicy="network-only">
      {({
        data: {
          constituency: { constituency },
        },
      }) => {
        if (!constituency) {
          return <VoteVarificationNoConstituency navigator={navigator} />;
        }
        return (
          <Query query={VOTES_SELECTION_LOCAL} fetchPolicy="no-cache">
            {({ data: localVotes }) => {
              if (!localVotes.votesSelectionLocal || localVotes.votesSelectionLocal.length === 0) {
                return <NoVotesPlaceholder subline="Wahlkreis" navigator={navigator} />;
              }
              return (
                <Query
                  query={GET_PROCEDURE_CHART_DATA}
                  variables={{
                    constituency,
                    directCandidate: true,
                    procedureIds: localVotes.votesSelectionLocal.map(
                      ({ procedureId }) => procedureId,
                    ),
                  }}
                  fetchPolicy="network-only"
                >
                  {({ data: proceduresData }) => {
                    let totalProcedures = 0;
                    if (
                      proceduresData &&
                      proceduresData.chartData &&
                      proceduresData.chartData[0].totalProcedures
                    ) {
                      totalProcedures = proceduresData.chartData[0].totalProcedures;
                      const votedProcedures = proceduresData.chartData[0].procedures.map(
                        ({ procedure, decision }) => ({
                          procedureId: procedure.procedureId,
                          decision,
                        }),
                      );
                      const { party, imgURL, name } = proceduresData.chartData[0];
                      const deputy = {
                        party,
                        imgURL,
                        constituency,
                        name,
                      };
                      return (
                        <Query
                          query={GET_DEPUTY_PROCEDURES}
                          variables={{
                            constituency,
                            directCandidate: true,
                            offset: 0,
                            pageSize: 10,
                          }}
                          fetchPolicy="network-only"
                        >
                          {({ data: procedurListData, fetchMore, networkStatus }) => {
                            if (
                              !(
                                procedurListData &&
                                procedurListData.deputyProcedures &&
                                procedurListData.deputyProcedures[0] &&
                                procedurListData.deputyProcedures[0].procedures
                              )
                            ) {
                              return null;
                            }
                            const listData =
                              procedurListData &&
                              procedurListData.deputyProcedures &&
                              procedurListData.deputyProcedures[0] &&
                              procedurListData.deputyProcedures[0].procedures
                                ? procedurListData.deputyProcedures[0].procedures.map(
                                    ({ procedure }) => procedure,
                                  )
                                : [];
                            return (
                              <Wrapper
                                data={['chart', ...listData]}
                                renderItem={({ item }) =>
                                  item === 'chart' ? (
                                    children({
                                      deputy,
                                      totalProcedures,
                                      chartData: { votedProcedures, localVotes },
                                    })
                                  ) : (
                                    <ListItem
                                      item={item}
                                      onClick={() => onProcedureListItemClick({ item })}
                                    />
                                  )
                                }
                                ListFooterComponent={() =>
                                  networkStatus === 3 ? (
                                    <Loading>
                                      <ActivityIndicator />
                                    </Loading>
                                  ) : null
                                }
                                onEndReached={() =>
                                  hasMore &&
                                  listData.length > 0 &&
                                  fetchMore({
                                    variables: {
                                      offset: listData.length,
                                    },
                                    fetchPolicy: 'network-only',
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                      if (!fetchMoreResult) return prev;
                                      if (
                                        hasMore &&
                                        fetchMoreResult.deputyProcedures[0].procedures.length === 0
                                      )
                                        hasMore = false;

                                      return {
                                        ...prev,
                                        deputyProcedures: [
                                          {
                                            ...prev.deputyProcedures[0],
                                            procedures: unionBy(
                                              prev.deputyProcedures[0].procedures,
                                              fetchMoreResult.deputyProcedures[0].procedures,
                                              p => p.procedure.procedureId,
                                            ),
                                          },
                                        ],
                                      };
                                    },
                                  })
                                }
                                keyExtractor={({ procedureId }) =>
                                  procedureId ? procedureId : 'chart'
                                }
                              />
                            );
                          }}
                        </Query>
                      );
                    }
                    return <NoVotesPlaceholder subline="Wahlkreis" navigator={navigator} />;
                  }}
                </Query>
              );
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
