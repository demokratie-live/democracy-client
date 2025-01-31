import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Text,
  ListRenderItem,
  SectionList,
  SectionListProps,
} from "react-native";
import { RouteProp } from "@react-navigation/core";

import { Segment } from "./Components/Segment";
import { communityVoteData } from "../../../lib/PieChartCommunityData";
import { NoConferenceWeekData } from "./NoConferenceWeekData";
import styled from "styled-components/native";
import { localVotesState } from "../../../api/state/votesLocal";
import { parlaments, parlamentState } from "../../../api/state/parlament";
import { useRecoilValue } from "recoil";
import { useListFilter } from "../../../api/hooks/useListFilter";
import { constituencyState } from "../../../api/state/constituency";
import { ListLoading } from "../../../components/ListLoading";
import { Centered } from "../../../components/Centered";
import { Button } from "../../../components/Button";
import {
  ListType,
  ProceduresListQuery,
  useProceduresListQuery,
} from "../../../__generated__/graphql";
import { pieChartGovernmentData } from "../../../lib/PieChartGovernmentData";
import { Row } from "../../../components/Row";
import { ListItem } from "../../../components/ListItem";
import { useRouter } from "expo-router";
import { BundestagTopTabParamList } from "../../../app/(sidebar)/[legislaturePeriod]";

export interface SegmentedData {
  title: string;
  data: ProceduresListQuery["procedures"];
}

type Item = ProceduresListQuery["procedures"][0];

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

interface ListProps {
  route: RouteProp<
    BundestagTopTabParamList,
    "Sitzungswoche" | "Vergangen" | "Top 100"
  >;
}

export const List: React.FC<ListProps> = ({ route }) => {
  const router = useRouter();
  const localVotes = useRecoilValue(localVotesState);
  const { proceduresFilter } = useListFilter();
  const constituency = useRecoilValue(constituencyState);
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];
  const constituencies = constituency ? [constituency] : [];
  const [hasMore, setHasMore] = useState(true);
  const { loading, data, error, fetchMore, networkStatus, refetch } =
    useProceduresListQuery({
      fetchPolicy: "network-only",
      errorPolicy: "all",
      variables: {
        listTypes: [route.params.list],
        pageSize: 10,
        filter: proceduresFilter,
        constituencies,
        period: parlament.period,
      },
    });

  useEffect(() => {
    setHasMore(true);
  }, [proceduresFilter]);

  const segmentedData: SegmentedData[] = useMemo(() => {
    if (data && ListType.Top100 === route.params.list) {
      return [
        {
          title: "",
          data: data.procedures,
        },
      ];
    } else if (data) {
      return data.procedures.reduce<SegmentedData[]>((prev, procedure) => {
        const { voteWeek, voteYear } = procedure;
        const segment =
          voteWeek && voteYear ? `KW ${voteWeek}/${voteYear}` : "";
        const index = prev.findIndex(({ title }) => title === segment);
        if (index !== -1) {
          return Object.assign([...prev], {
            [index]: { title: segment, data: [...prev[index].data, procedure] },
          });
        }
        return [
          ...prev,
          {
            title: segment,
            data: [procedure],
          },
        ];
      }, []);
    } else {
      return [];
    }
  }, [data, route.params.list]);

  const handleProcedurePress = useCallback(
    (procedureId: string) => {
      router.push(`procedure/${procedureId}`);
    },
    [router]
  );

  const renderItem: ListRenderItem<Item> = useCallback(
    ({
      item: {
        procedureId,
        title,
        sessionTOPHeading,
        subjectGroups,
        voteDate,
        voteEnd,
        voted: votedServer,
        type,
        voteResults,
        votedGovernment,
        communityVotes,
      },
      index,
    }) => {
      // If no session top headings available use subject groups
      let subline = null;
      if (sessionTOPHeading) {
        subline = sessionTOPHeading;
      } else if (subjectGroups) {
        subline = subjectGroups.join(", ");
      }

      const govSlices = pieChartGovernmentData({
        voteResults,
        votedGovernment,
      });

      const localSelection = localVotes.find(
        (localVote) => localVote.procedureId === procedureId
      )?.selection;
      const voted = votedServer || !!localSelection;

      const communityVoteSlices = communityVoteData({
        communityVotes,
        localSelection,
        voted,
      });

      return (
        <Row
          onPress={() => handleProcedurePress(procedureId)}
          testID={`ListItem-${route.params.list}-${index}`}
        >
          <ListItem
            title={title}
            subline={subline}
            voteDate={voteDate ? new Date(voteDate) : undefined}
            endDate={voteEnd ? new Date(voteEnd) : undefined}
            voted={voted}
            votes={communityVotes ? communityVotes.total || 0 : 0}
            govermentChart={{
              votes: govSlices,
              large: true,
            }}
            communityVotes={communityVoteSlices}
          />
        </Row>
      );
    },
    [localVotes, route.params.list, handleProcedurePress]
  );

  const renderSectionHeader: SectionListProps<
    Item,
    SegmentedData
  >["renderSectionHeader"] = useCallback(
    ({ section }: { section: SegmentedData }) =>
      route.params.list !== "TOP100" && section.title ? (
        <Segment text={section.title} />
      ) : null,
    [route.params.list]
  );

  if (loading) {
    return (
      <Container>
        <ListLoading />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <Centered>
          <Text>Verbindungsfehler</Text>
          <Button
            onPress={() => {
              refetch({
                listTypes: [route.params.list],
                pageSize: 10,
                filter: proceduresFilter,
                constituencies,
              });
            }}
            text="Nochmal versuchen"
            textColor="blue"
            backgroundColor="transparent"
          />
        </Centered>
      </Container>
    );
  }

  if (data.procedures.length === 0) {
    return <NoConferenceWeekData />;
  }

  return (
    <Container>
      <SectionList<Item, SegmentedData>
        sections={segmentedData}
        stickySectionHeadersEnabled
        renderSectionHeader={renderSectionHeader}
        testID="ListView"
        renderItem={renderItem}
        keyExtractor={({ procedureId }) => procedureId}
        refreshing={networkStatus === 4}
        ListFooterComponent={() => (hasMore ? <ListLoading /> : null)}
        onRefresh={() => {
          setHasMore(true);
          refetch();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          !loading &&
            hasMore &&
            fetchMore({
              variables: {
                offset: data.procedures.length,
              },
            }).then(({ data: fetchMoreData }) => {
              if (fetchMoreData.procedures.length === 0) {
                setHasMore(false);
              }
            });
        }}
      />
    </Container>
  );
};
