import React, { ReactElement } from 'react';
import unionBy from 'lodash.unionby';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import {
  useDeputyChartDataQuery,
  useDeputyProceduresQuery,
  VoteSelection,
} from '../../../__generated__/graphql';
import { useRecoilValue } from 'recoil';
import { LocalVote, localVotesState } from '../../../api/state/votesLocal';
import { constituencyState } from '../../../api/state/constituency';
import { NoConstituency } from '../../../components/NoConstituency';
import { Row } from '../../../components/Row';
import { ListItem } from '../../../components/ListItem';
import { pieChartFull } from '../../../lib/PieChartFull';
import { ListLoading } from '../../../components/ListLoading';

const VoteVarificationNoConstituencyWrapper = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: center;
  margin-bottom: 80px;
`;

export interface ChartData {
  votedProcedures: {
    procedureId: string;
    decision: VoteSelection;
  }[];
  localVotes: LocalVote[];
}
interface ChildProps {
  deputy: {
    party: string | null | undefined;
    imgURL: string;
    constituency: string;
    name: string;
  };
  totalProcedures: number;
  chartData: ChartData;
}
interface Props {
  onProcedureListItemClick: ({
    item,
  }: {
    item:
      | 'chart'
      | {
          title: string;
          procedureId: string;
          type?: string;
        };
  }) => void;
  children: JSX.Element | ((props: ChildProps) => ReactElement);
}

const VotedProceduresWrapper: React.FC<Props> = ({ onProcedureListItemClick, children }) => {
  const localVotes = useRecoilValue(localVotesState);
  const constituency = useRecoilValue(constituencyState);

  let deputyVotes: { [procedureId: string]: VoteSelection } = {};

  const { data: proceduresData } = useDeputyChartDataQuery({
    variables: {
      constituency: constituency ?? '',
      directCandidate: true,
      procedureIds: localVotes.map(({ procedureId }) => procedureId),
    },
  });

  const {
    data: procedurListData,
    fetchMore,
    networkStatus,
  } = useDeputyProceduresQuery({
    returnPartialData: true,
    variables: {
      constituency: constituency ?? '',
      directCandidate: true,
      offset: 0,
      pageSize: 11,
    },
  });

  if (!constituency) {
    return (
      <VoteVarificationNoConstituencyWrapper>
        <NoConstituency />
      </VoteVarificationNoConstituencyWrapper>
    );
  }

  let hasMore = true;
  // if (localVotes.length === 0) {
  //   return <NoVotesPlaceholder subline="Wahlkreis" />;
  // }
  let totalProcedures = 0;
  if (
    proceduresData &&
    proceduresData.chartData &&
    proceduresData.chartData[0] &&
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
        ? procedurListData.deputyProcedures[0].procedures.map(({ procedure }) => procedure)
        : [];

    deputyVotes = procedurListData.deputyProcedures[0].procedures.reduce<{
      [procedureId: string]: VoteSelection;
    }>((prev, procedure) => {
      return { ...prev, [procedure.procedure.procedureId]: procedure.decision };
    }, {});
    return (
      <FlatList<'chart' | typeof listData[0]>
        data={['chart', ...listData]}
        renderItem={({ item }) => {
          if (item === 'chart') {
            const renderedChild = (children as (props: ChildProps) => ReactElement)({
              deputy,
              totalProcedures,
              chartData: {
                votedProcedures,
                localVotes,
              },
            });
            return renderedChild;
          } else {
            const localSelection = localVotes.find(
              localVote => localVote.procedureId === item.procedureId,
            )?.selection;
            return (
              <Row onPress={() => onProcedureListItemClick({ item })}>
                <ListItem
                  title={item.title}
                  voted={item.voted}
                  subline={
                    item.sessionTOPHeading ? item.sessionTOPHeading : item.subjectGroups.join(', ')
                  }
                  votes={item.communityVotes ? item.communityVotes.total || 0 : 0}
                  govermentChart={{
                    votes: pieChartFull({
                      decision: deputyVotes[item.procedureId],
                      colorSchema: 'GOVERNMENT',
                    }),
                  }}
                  communityVotes={pieChartFull({
                    decision: localSelection,
                    colorSchema: 'COMMUNITY',
                  })}
                  // communityVotes={communityVoteData({
                  //   ...item,
                  //   localSelection,
                  //   voted,
                  // })}
                />
              </Row>
            );
          }
        }}
        ListFooterComponent={() => (networkStatus === 3 ? <ListLoading /> : null)}
        onEndReached={() => {
          hasMore &&
            listData &&
            listData.length > 0 &&
            fetchMore({
              variables: {
                offset: listData.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev;
                }
                if (hasMore && fetchMoreResult.deputyProcedures[0].procedures.length === 0) {
                  hasMore = false;
                }

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
            });
        }}
        keyExtractor={item => (item === 'chart' ? item : item.procedureId)}
      />
    );
  }
  return <NoVotesPlaceholder subline="Wahlkreis" />;
};

export default VotedProceduresWrapper;
