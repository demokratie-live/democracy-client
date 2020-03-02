import React, { useContext, ReactElement } from 'react';
import styled from 'styled-components/native';
import unionBy from 'lodash.unionby';

// Components
import NoVotesPlaceholder from './NoVotesPlaceholder';

// GraphQL
import { FlatList } from 'react-native';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { LocalVotesContext } from '../../context/LocalVotes';
import { useQuery } from '@apollo/react-hooks';
import { pieChartGovernmentData } from '../../lib/helper/PieChartGovernmentData';
import { communityVoteData } from '../../lib/helper/PieChartCommunityData';
import { ChainEntry } from '../../lib/VotesLocal';
import { VOTED_PROCEDURES } from './graphql/queries/proceduresByIdHavingVoteResults';
import {
  VotedProcedures,
  VotedProceduresVariables,
  VotedProcedures_proceduresByIdHavingVoteResults_procedures,
} from './graphql/queries/__generated__/VotedProcedures';
import {
  PartyChartData,
  PartyChartDataVariables,
} from '../Bundestag/Procedure/Voting/components/graphql/query/__generated__/PartyChartData';
import { PARTY_CHART_DATA } from '../Bundestag/Procedure/Voting/components/graphql/query/proceduresByIdHavingVoteResults';

const Container = styled.View`
  background-color: #fff;
`;

export interface ChartData {
  votedProcedures: PartyChartData;
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
    item: VotedProcedures_proceduresByIdHavingVoteResults_procedures;
  }) => void;
  children: JSX.Element | ((props: ChildProps) => ReactElement);
}

const VotedProceduresWrapper: React.FC<Props> = ({
  onProcedureListItemClick,
  children,
}) => {
  const { localVotes } = useContext(LocalVotesContext);
  const { data: proceduresData } = useQuery<
    PartyChartData,
    PartyChartDataVariables
  >(PARTY_CHART_DATA, {
    variables: {
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
      pageSize: 999999,
    },
  });

  const { data: procedurListData, fetchMore, networkStatus } = useQuery<
    VotedProcedures,
    VotedProceduresVariables
  >(VOTED_PROCEDURES, {
    variables: { offset: 0 },
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
        'chart' | VotedProcedures_proceduresByIdHavingVoteResults_procedures
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
