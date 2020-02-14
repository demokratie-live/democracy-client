import React, { useContext, ReactElement } from 'react';
import styled from 'styled-components/native';
import unionBy from 'lodash.unionby';

// Components
import NoVotesPlaceholder from '../NoVotesPlaceholder';

// GraphQL
import { PROCEDURES_BY_HAVING_VOTE_RESULTS } from '../../Bundestag/Procedure/Voting/components/graphql/query/proceduresByIdHavingVoteResults';
import { FlatList } from 'react-native';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { LocalVotesContext } from '../../../context/LocalVotes';
import {
  proceduresByIdHavingVoteResults,
  proceduresByIdHavingVoteResultsVariables,
  proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures,
} from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';
import { useQuery } from '@apollo/react-hooks';
import { pieChartGovernmentData } from '../../../lib/helper/PieChartGovernmentData';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { ChainEntry } from '../../../lib/VotesLocal';

const Container = styled.View`
  background-color: #fff;
`;

export interface ChartData {
  votedProcedures: proceduresByIdHavingVoteResults;
  localVotes: ChainEntry[];
}
interface ChildProps {
  totalProcedures: number;
  chartData: ChartData;
}
interface Props {
  onProcedureListItemClick: ({
    item,
  }: {
    item: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures;
  }) => void;
  children: JSX.Element | ((props: ChildProps) => ReactElement);
}

const VotedProceduresWrapper: React.FC<Props> = ({
  onProcedureListItemClick,
  children,
}) => {
  const { localVotes, getLocalVoteSelection } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    proceduresByIdHavingVoteResults,
    proceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_BY_HAVING_VOTE_RESULTS, {
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });
  const { data: procedurListData, fetchMore, networkStatus } = useQuery<
    proceduresByIdHavingVoteResults,
    proceduresByIdHavingVoteResultsVariables
  >(PROCEDURES_BY_HAVING_VOTE_RESULTS, {
    variables: { procedureIds: null, offset: 0 },
  });
  let hasMore = true;
  if (!localVotes || localVotes.length === 0) {
    return <NoVotesPlaceholder subline="Bundestag" />;
  }
  let totalProcedures = 0;
  if (proceduresData && proceduresData.proceduresByIdHavingVoteResults) {
    totalProcedures = proceduresData.proceduresByIdHavingVoteResults.total || 0;
  }
  if (!procedurListData || !proceduresData) {
    return <ListLoading />;
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
            (children as (props: ChildProps) => ReactElement)({
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
                govermentChart={{
                  votes: pieChartGovernmentData({
                    ...item,
                    largeDecision: item.voteResults
                      ? item.voteResults.governmentDecision
                      : undefined,
                  }),
                }}
                communityVotes={communityVoteData({
                  ...item,
                  localSelection: getLocalVoteSelection(item.procedureId),
                })}
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
              offset:
                procedurListData.proceduresByIdHavingVoteResults.procedures
                  .length,
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
