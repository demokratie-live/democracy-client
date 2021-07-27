import { useQuery } from '@apollo/client';
import {
  DeputyList,
  DeputyListRenderItemProps,
} from '@democracy-deutschland/ui';
import React, { useContext } from 'react';
import { FavorizedDeputiesContext } from '../../../lib/states/FavorizedDeputies';
import { WOM_DEPUTY_LIST } from './graphql/queries/WomDeputyList';
import {
  WomDeputyListQuery,
  WomDeputyListQueryVariables,
} from './graphql/queries/__generated__/WomDeputyListQuery';
import { useNavigation } from '@react-navigation/core';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { MatchesBar } from './MatchBar';

export const WomDeputyList: React.FC = () => {
  const navigation = useNavigation();
  const { localVotes } = useContext(LocalVotesContext);
  const { favorizedDeputies } = useContext(FavorizedDeputiesContext);
  const { data } = useQuery<WomDeputyListQuery, WomDeputyListQueryVariables>(
    WOM_DEPUTY_LIST,
    {
      variables: {
        limit: Math.min(favorizedDeputies.length, 100),
        filterIds: favorizedDeputies,
        votedProcedureIds: localVotes.map(({ procedureId }) => procedureId),
      },
    },
  );

  console.log(data);
  if (!data?.deputies) {
    return null;
  }

  const deputies =
    [...(data?.deputies.data ?? [])]
      .map<Omit<DeputyListRenderItemProps, 'onPress'> & { matches: number }>(
        deputy => ({
          id: deputy.webId,
          avatar: {
            profileImage: {
              source: {
                uri: deputy.imgURL,
              },
              height: 50,
              variant: 'round',
            },
            partyLogo: {
              party: deputy.party as
                | 'Union'
                | 'SPD'
                | 'FDP'
                | 'Grüne'
                | 'AfD'
                | 'Linke',
              width: 50,
            },
          },
          title: deputy.name,
          subtitle: <MatchesBar decisions={deputy.matchesBar} />,
          matches: deputy.matchesBar.reduce((matches, d) => {
            const localVote = localVotes.find(
              ({ procedureId }) => d.procedure.procedureId === procedureId,
            );
            return localVote?.selection === d.decision ? matches + 1 : matches;
          }, 0),
        }),
      )
      .sort((a, b) => b.matches - a.matches) || [];

  const deputiesData = deputies.map(d => ({
    ...d,
    onPress: () => navigation.navigate('DeputyProfile', { id: d.id }),
  }));

  return (
    <DeputyList deputies={deputiesData} favorizedDeputies={favorizedDeputies} />
  );
};
