import {
  DeputyList,
  DeputyListRenderItemProps,
} from "@democracy-deutschland/ui";
import React from "react";

import { MatchesBar } from "./MatchBar";
import { useRecoilValue } from "recoil";
import { parlaments, parlamentState } from "../../../api/state/parlament";
import { favorizedDeputiesState } from "../../../api/state/favorizedDeputies";
import { localVotesState } from "../../../api/state/votesLocal";
import { useWomDeputyListQueryQuery } from "../../../__generated__/graphql";
import { useRouter } from "expo-router";

export const WomDeputyList: React.FC = () => {
  const router = useRouter();
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];
  const localVotes = useRecoilValue(localVotesState);
  const favorizedDeputies = useRecoilValue(
    favorizedDeputiesState(parlamentIdentifier)
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
    onPress: () => router.push(`DeputyProfile/${d.id}`),
  }));

  return (
    <DeputyList deputies={deputiesData} favorizedDeputies={favorizedDeputies} />
  );
};
