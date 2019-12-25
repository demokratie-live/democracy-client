import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { unionBy } from 'lodash';

// Components
import NoVotesPlaceholder from './NoVotesPlaceholder';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../Bundestag/Procedure/Voting/components/graphql/query/proceduresByIdHavingVoteResults';
import { FlatList } from 'react-native';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { LocalVotesContext } from '../../context/LocalVotes';
import {
  proceduresByIdHavingVoteResults,
  proceduresByIdHavingVoteResultsVariables,
  proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures,
} from '../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';
import { useQuery } from '@apollo/react-hooks';
import { pieChartGovernmentData } from '../../lib/helper/PieChartGovernmentData';
import { communityVoteData } from '../../lib/helper/PieChartCommunityData';

const Container = styled.View`
  background-color: #fff;
`;

const VotedProceduresWrapper = ({
  onProcedureListItemClick,
  children,
}: any) => {
  const { localVotes } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    proceduresByIdHavingVoteResults,
    proceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_WITH_VOTE_RESULTS, {
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });
  const { data: procedurListData, fetchMore, networkStatus } = useQuery<
    proceduresByIdHavingVoteResults,
    proceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_WITH_VOTE_RESULTS, {
    variables: { procedureIds: null, offset: 0 },
  });
  let hasMore = true;
  if (!localVotes || localVotes.length === 0) {
    return <NoVotesPlaceholder subline="Bundestag" />;
  }
  let totalProcedures: any = 0;
  if (proceduresData && proceduresData.proceduresByIdHavingVoteResults) {
    totalProcedures = proceduresData.proceduresByIdHavingVoteResults.total;
  }
  const listData =
    procedurListData &&
    procedurListData.proceduresByIdHavingVoteResults &&
    procedurListData.proceduresByIdHavingVoteResults.procedures
      ? procedurListData.proceduresByIdHavingVoteResults.procedures
      : [];
  return (
    <Container>
      <FlatList<
        | 'chart'
        | proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures
      >
        data={['chart', ...listData]}
        renderItem={({ item }) =>
          item === 'chart' ? (
            children({
              totalProcedures,
              chartData: {
                votedProcedures: proceduresData,
                localVotes,
              },
            })
          ) : (
            <Row onPress={() => onProcedureListItemClick({ item })}>
              <ListItem
                {...item}
                votes={item.communityVotes ? item.communityVotes.total || 0 : 0}
                governmentVotes={pieChartGovernmentData(item)}
                communityVotes={communityVoteData(item)}
              />
            </Row>
          )
        }
        ListFooterComponent={() =>
          networkStatus === 3 ? <ListLoading /> : null
        }
        onEndReached={() =>
          hasMore &&
          listData.length > 0 &&
          fetchMore({
            variables: {
              offset: procedurListData!.proceduresByIdHavingVoteResults
                .procedures.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }
              if (
                hasMore &&
                fetchMoreResult.proceduresByIdHavingVoteResults.procedures
                  .length === 0
              ) {
                hasMore = false;
              }
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
        keyExtractor={item => (item === 'chart' ? item : item.procedureId)}
      />
    </Container>
  );
};

export default VotedProceduresWrapper;
