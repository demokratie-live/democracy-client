import React, { useCallback } from "react";
import { SectionList, SectionListProps } from "react-native";
import styled from "styled-components/native";

import { ListLoading } from "../../../components/ListLoading";
import { ListType } from "../../../__generated__/graphql";
import { NoConferenceWeekData } from "./NoConferenceWeekData";
import { ErrorState } from "./Components/ErrorState";
import { RetryState } from "./Components/RetryState";
import { Segment } from "./Components/Segment";
import { SegmentedData, useProceduresList } from "./hooks/useProceduresList";
import {
  ProcedureListItem,
  useProceduresListItemRenderer,
} from "./hooks/useProceduresListItemRenderer";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

interface ListProps {
  list: ListType;
}

export const List: React.FC<ListProps> = ({ list }) => {
  const {
    procedures,
    segmentedData,
    loading,
    isRetrying,
    remainingAttempts,
    error,
    hasMore,
    networkStatus,
    handleRefresh,
    handleEndReached,
  } = useProceduresList(list);

  const renderItem = useProceduresListItemRenderer(list);

  const renderSectionHeader: SectionListProps<
    ProcedureListItem,
    SegmentedData
  >["renderSectionHeader"] = useCallback(
    ({ section }: { section: SegmentedData }) =>
      list !== "TOP100" && section.title ? (
        <Segment text={section.title} />
      ) : null,
    [list]
  );

  if (loading) {
    return (
      <Container>
        <ListLoading />
      </Container>
    );
  }

  if (isRetrying) {
    return (
      <Container>
        <RetryState remainingAttempts={remainingAttempts} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorState
          onRetry={() => {
            void handleRefresh();
          }}
        />
      </Container>
    );
  }

  if (procedures.length === 0) {
    return <NoConferenceWeekData />;
  }

  return (
    <Container>
      <SectionList<ProcedureListItem, SegmentedData>
        sections={segmentedData}
        stickySectionHeadersEnabled
        renderSectionHeader={renderSectionHeader}
        testID="ListView"
        renderItem={renderItem}
        keyExtractor={({ procedureId }) => procedureId}
        refreshing={networkStatus === 4}
        ListFooterComponent={() => (hasMore ? <ListLoading /> : null)}
        onRefresh={() => {
          void handleRefresh();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          void handleEndReached();
        }}
      />
    </Container>
  );
};
