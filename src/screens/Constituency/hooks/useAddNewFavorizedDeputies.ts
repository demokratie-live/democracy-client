import { useSetRecoilState } from "recoil";
import { client } from "../../../api/apollo";
import { favorizedDeputiesState } from "../../../api/state/favorizedDeputies";
import { ParlamentIdentifier, parlaments } from "../../../api/state/parlament";
import {
  GetDeputiesForNewConstituencyDocument,
  GetDeputiesForNewConstituencyQuery,
  GetDeputiesForNewConstituencyQueryVariables,
} from "../../../__generated__/graphql";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

export const useAddNewFavorizedDeputies = () => {
  const { legislaturePeriod } = useLegislaturePeriodStore();
  const parlamentIdentifier = `BT-${legislaturePeriod}` as ParlamentIdentifier;
  const setFavorizedDeputy = useSetRecoilState(
    favorizedDeputiesState(parlamentIdentifier)
  );

  const parlament = parlaments[parlamentIdentifier];

  const setNewFavorizedDeputies = (constituency: string) => {
    client
      .query<
        GetDeputiesForNewConstituencyQuery,
        GetDeputiesForNewConstituencyQueryVariables
      >({
        query: GetDeputiesForNewConstituencyDocument,
        variables: {
          period: parlament.period,
          filterConstituency: constituency,
        },
      })
      .then(({ data }) => {
        const deputyIds = data.deputies.data.map(({ webId }) => webId);
        setFavorizedDeputy((ids) => [...new Set([...ids, ...deputyIds])]);
      });
  };
  return setNewFavorizedDeputies;
};
