import { useRecoilValue, useSetRecoilState } from 'recoil';
import { client } from '../../../api/apollo';
import { favorizedDeputiesState } from '../../../api/state/favorizedDeputies';
import { parlaments, parlamentState } from '../../../api/state/parlament';
import {
  GetDeputiesForNewConstituencyDocument,
  GetDeputiesForNewConstituencyQuery,
  GetDeputiesForNewConstituencyQueryVariables,
} from '../../../__generated__/graphql';

export const useAddNewFavorizedDeputies = () => {
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const setFavorizedDeputy = useSetRecoilState(favorizedDeputiesState(parlamentIdentifier));

  const parlament = parlaments[parlamentIdentifier];

  const setNewFavorizedDeputies = (constituency: string) => {
    client
      .query<GetDeputiesForNewConstituencyQuery, GetDeputiesForNewConstituencyQueryVariables>({
        query: GetDeputiesForNewConstituencyDocument,
        variables: {
          period: parlament.period,
          filterConstituency: constituency,
        },
      })
      .then(({ data }) => {
        const deputyIds = data.deputies.data.map(({ webId }) => webId);
        setFavorizedDeputy(ids => [...new Set([...ids, ...deputyIds])]);
      });
  };
  return setNewFavorizedDeputies;
};
