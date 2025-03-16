import React, { useContext } from "react";
import styled from "styled-components/native";
import unionBy from "lodash.unionby";

// GraphQL
import { FlatList, Text } from "react-native";
import { WomPartyChart } from "./WomPartyChart";
import { WomPartyContext } from "./context";
import { useRecoilValue } from "recoil";
import { ParlamentIdentifier, parlaments } from "../../../api/state/parlament";
import { localVotesState } from "../../../api/state/votesLocal";
import { ListLoading } from "../../../components/ListLoading";
import { Row } from "../../../components/Row";
import { ListItem } from "../../../components/ListItem";
import { pieChartPartyData } from "../../../lib/PieChartPartyData";
import { communityVoteData } from "../../../lib/PieChartCommunityData";
import {
  useVotedPartyProceduresQuery,
  VotedPartyProceduresDocument,
  VotedPartyProceduresQuery,
} from "../../../__generated__/graphql";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export interface WomPartyListProps {
  onProcedureListItemClick: ({
    item,
  }: {
    item: {
      title: string;
      procedureId: string;
      type?: string;
    };
  }) => void;
}

const WomPartyList: React.FC<WomPartyListProps> = ({
  onProcedureListItemClick,
}) => {
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];
  const { party } = useContext(WomPartyContext);
  const localVotes = useRecoilValue(localVotesState);

  const {
    data: procedurListDataNew,
    previousData: procedurListDataPrev,
    error,
    fetchMore,
    networkStatus,
  } = useVotedPartyProceduresQuery({
    returnPartialData: true,
    variables: { offset: 0, pageSize: 10, period: parlament.period },
  });

  const procedurListData = procedurListDataNew?.procedurecForWomPartyList
    ? procedurListDataNew
    : procedurListDataPrev?.procedurecForWomPartyList
    ? procedurListDataPrev
    : undefined;

  let hasMore = true;
  if (error) {
    return <Text>ERROR</Text>;
  }
  if (!procedurListData?.procedurecForWomPartyList) {
    return <ListLoading />;
  }
  const listData =
    procedurListData &&
    procedurListData.procedurecForWomPartyList &&
    procedurListData.procedurecForWomPartyList.procedures
      ? procedurListData.procedurecForWomPartyList.procedures
      : [];

  return (
    <Container>
      <FlatList<
        VotedPartyProceduresQuery["procedurecForWomPartyList"]["procedures"][0]
      >
        ListHeaderComponent={WomPartyChart}
        data={listData}
        renderItem={({ item }) => {
          const localSelection = localVotes.find(
            (localVote) => localVote.procedureId === item.procedureId
          )?.selection;
          const voted = !!localSelection;
          return (
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
                  votes: party
                    ? pieChartPartyData({
                        ...item,
                        votedGovernment: item.votedGovernment,
                        partyVotes: item.voteResults?.partyVotes,
                        selectedParty: party,
                      })
                    : undefined,
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
          if (hasMore && listData.length > 0) {
            fetchMore({
              query: VotedPartyProceduresDocument,
              variables: {
                offset:
                  procedurListData.procedurecForWomPartyList.procedures.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!prev) {
                  throw new Error("prev is undefined");
                }
                if (!fetchMoreResult) {
                  return prev;
                }
                if (
                  hasMore &&
                  fetchMoreResult.procedurecForWomPartyList.procedures
                    .length === 0
                ) {
                  hasMore = false;
                }

                return Object.assign({}, prev, {
                  procedurecForWomPartyList: {
                    ...prev.procedurecForWomPartyList,
                    procedures: unionBy(
                      prev.procedurecForWomPartyList.procedures,
                      fetchMoreResult.procedurecForWomPartyList.procedures,
                      "_id"
                    ),
                  },
                });
              },
            });
          }
        }}
        keyExtractor={(item) => item.procedureId}
      />
    </Container>
  );
};

export default WomPartyList;
