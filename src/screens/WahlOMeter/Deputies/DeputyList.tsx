import {
  DeputyList,
  DeputyListRenderItemProps,
} from "@democracy-deutschland/ui";
import React from "react";

import { MatchesBar } from "./MatchBar";
import { ParlamentIdentifier, parlaments } from "../../../api/state/parlament";
import { useFavorizedDeputiesStore } from "../../../api/state/favorizedDeputies";
import { useLocalVotes } from "../../../api/state/localVotesStore";
import { useWomDeputyListQueryQuery } from "../../../__generated__/graphql";
import { router } from "expo-router";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

export const WomDeputyList: React.FC = () => {
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const parlament = parlaments[parlamentIdentifier];
  const localVotes = useLocalVotes();
  const favorizedDeputies = useFavorizedDeputiesStore((state) =>
    state.getDeputies(parlamentIdentifier)
  );
  const { data } = useWomDeputyListQueryQuery({
    variables: {
      limit: Math.min(favorizedDeputies.length, 100),
      filterIds: favorizedDeputies,
      votedProcedureIds: localVotes.map(({ procedureId }) => procedureId),
      period: parlament.period,
    },
  });

  if (!data?.deputies) {
    return null;
  }

  const deputies =
    [...(data?.deputies.data ?? [])]
      .map<Omit<DeputyListRenderItemProps, "onPress"> & { matches: number }>(
        (deputy) => ({
          id: deputy.webId,
          avatar: {
            profileImage: {
              source: {
                uri: deputy.imgURL,
              },
              height: 50,
              variant: "round",
            },
            partyLogo: {
              party: deputy.party as
                | "Union"
                | "SPD"
                | "FDP"
                | "Grüne"
                | "AfD"
                | "Linke",
              width: 50,
            },
          },
          title: deputy.name,
          subtitle: <MatchesBar decisions={deputy.matchesBar} />,
          matches: deputy.matchesBar.reduce((matches, d) => {
            const localVote = localVotes.find(
              ({ procedureId }) => d.procedure.procedureId === procedureId
            );
            return localVote?.selection === d.decision ? matches + 1 : matches;
          }, 0),
        })
      )
      .sort((a, b) => b.matches - a.matches) || [];

  const deputiesData = deputies.map((d) => ({
    ...d,
    onPress: () => router.push(`/DeputyProfile/${d.id}`),
  }));

  return (
    <DeputyList deputies={deputiesData} favorizedDeputies={favorizedDeputies} />
  );
};
