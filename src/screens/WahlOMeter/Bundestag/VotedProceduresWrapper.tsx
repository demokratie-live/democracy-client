import React, { ReactElement } from "react";
import styled from "styled-components/native";
import unionBy from "lodash.unionby";
import { FlatList } from "react-native";
import { LocalVote } from "../../../api/state/localVotesStore";
import { useLocalVotes } from "../../../api/state/localVotesStore";
import { ParlamentIdentifier, parlaments } from "../../../api/state/parlament";
import {
  PartyChartDataQuery,
  ProceduresByIdHavingVoteResultsQuery,
  usePartyChartDataQuery,
  useProceduresByIdHavingVoteResultsQuery,
} from "../../../__generated__/graphql";
import { ListLoading } from "../../../components/ListLoading";
import { Row } from "../../../components/Row";
import { ListItem } from "../../../components/ListItem";
import { pieChartGovernmentData } from "../../../lib/PieChartGovernmentData";
import { communityVoteData } from "../../../lib/PieChartCommunityData";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export interface ChartData {
  votedProcedures: PartyChartDataQuery;
  localVotes: LocalVote[];
}
interface ChildProps {
  totalProcedures: number;
  chartData: ChartData;
}
interface Props {
  onProcedureListItemClick: ({
    item,
  }: {
    item: {
      title: string;
      procedureId: string;
      type?: string;
    };
  }) => void;
  children: JSX.Element | ((props: ChildProps) => ReactElement);
}

const VotedProceduresWrapper: React.FC<Props> = ({
  onProcedureListItemClick,
  children,
}) => {
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];
  const localVotes = useLocalVotes();
  const { data: proceduresDataNew, previousData: proceduresDataPrev } =
    usePartyChartDataQuery({
      variables: {
        procedureIds: localVotes.map(({ procedureId }) => procedureId),
        pageSize: 999999,
        period: parlament.period,
      },
    });

  const proceduresData = proceduresDataNew?.partyChartProcedures
    ? proceduresDataNew
    : proceduresDataPrev?.partyChartProcedures
    ? proceduresDataPrev
    : undefined;

  const {
    data: procedurListDataNew,
    previousData: procedurListDataPrev,
    fetchMore,
    networkStatus,
  } = useProceduresByIdHavingVoteResultsQuery({
    variables: { offset: 0, pageSize: 10, period: parlament.period },
    returnPartialData: true,
  });

  const procedurListData = procedurListDataNew?.proceduresByIdHavingVoteResults3
    ? procedurListDataNew
    : procedurListDataPrev?.proceduresByIdHavingVoteResults3
    ? procedurListDataPrev
    : undefined;

  let hasMore = true;
  // if (!localVotes || localVotes.length === 0) {
  //   return <NoVotesPlaceholder subline="Bundestag" />;
  // }
  let totalProcedures = 0;
  if (proceduresData && proceduresData.partyChartProcedures) {
    totalProcedures = proceduresData.partyChartProcedures.total || 0;
  }

  if (!procedurListData || !proceduresData) {
    return <ListLoading />;
  }
  const listData =
    procedurListData &&
    procedurListData.proceduresByIdHavingVoteResults3 &&
    procedurListData.proceduresByIdHavingVoteResults3.procedures
      ? procedurListData.proceduresByIdHavingVoteResults3.procedures
      : [];

  return (
    <Container>
      <FlatList<
        | "chart"
        | ProceduresByIdHavingVoteResultsQuery["proceduresByIdHavingVoteResults3"]["procedures"][0]
      >
        data={["chart", ...listData]}
        renderItem={({ item }) => {
          const localSelection =
            item !== "chart"
              ? localVotes.find(
                  (localVote) => localVote.procedureId === item.procedureId
                )?.selection
              : undefined;
          const voted = !!localSelection;
          return item === "chart" ? (
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
                voteDate={item.voteDate ? new Date(item.voteDate) : undefined}
                subline={
                  item.sessionTOPHeading
                    ? item.sessionTOPHeading
                    : item.subjectGroups.join(", ")
                }
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
                  localSelection,
                  voted,
                })}
              />
            </Row>
          );
        }}
        ListFooterComponent={() =>
          networkStatus === 3 ? <ListLoading /> : null
        }
        onEndReached={() => {
          hasMore &&
            listData.length > 0 &&
            fetchMore({
              variables: {
                offset:
                  procedurListData.proceduresByIdHavingVoteResults3.procedures
                    .length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev;
                }
                if (
                  hasMore &&
                  fetchMoreResult.proceduresByIdHavingVoteResults3.procedures
                    .length === 0
                ) {
                  hasMore = false;
                }

                return Object.assign({}, prev, {
                  proceduresByIdHavingVoteResults3: {
                    ...prev.proceduresByIdHavingVoteResults3,
                    procedures: unionBy(
                      prev.proceduresByIdHavingVoteResults3.procedures,
                      fetchMoreResult.proceduresByIdHavingVoteResults3
                        .procedures,
                      "_id"
                    ),
                  },
                });
              },
            });
        }}
        keyExtractor={(item) => (item === "chart" ? item : item.procedureId)}
      />
    </Container>
  );
};

export default VotedProceduresWrapper;
