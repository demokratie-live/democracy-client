import { useCallback } from "react";
import { ListRenderItem } from "react-native";
import { useRouter } from "expo-router";

import { useLocalVotes } from "../../../../api/state/localVotesStore";
import { communityVoteData } from "../../../../lib/PieChartCommunityData";
import { pieChartGovernmentData } from "../../../../lib/PieChartGovernmentData";
import { Row } from "../../../../components/Row";
import { ListItem } from "../../../../components/ListItem";
import {
  ListType,
  ProceduresListQuery,
} from "../../../../__generated__/graphql";

export type ProcedureListItem = ProceduresListQuery["procedures"][0];

export const useProceduresListItemRenderer = (
  list: ListType
): ListRenderItem<ProcedureListItem> => {
  const router = useRouter();
  const localVotes = useLocalVotes();

  const handleProcedurePress = useCallback(
    (procedureId: string) => {
      router.push(`/procedure/${procedureId}`);
    },
    [router]
  );

  return useCallback<ListRenderItem<ProcedureListItem>>(
    ({
      item: {
        procedureId,
        title,
        sessionTOPHeading,
        subjectGroups,
        voteDate,
        voteEnd,
        voted: votedServer,
        voteResults,
        votedGovernment,
        communityVotes,
      },
      index,
    }) => {
      let subline: string | null = null;
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
          testID={`ListItem-${list}-${index}`}
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
    [handleProcedurePress, list, localVotes]
  );
};
