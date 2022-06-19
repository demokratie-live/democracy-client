import { DeputyList, DeputyListRenderItemProps } from '@democracy-deutschland/ui';
import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { MatchesBar } from './MatchBar';
import { useRecoilValue } from 'recoil';
import { parlaments, parlamentState } from '../../../api/state/parlament';
import { favorizedDeputiesState } from '../../../api/state/favorizedDeputies';
import { localVotesState } from '../../../api/state/votesLocal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';
import { useWomDeputyListQueryQuery } from '../../../__generated__/graphql';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sidebar'>;

export const WomDeputyList: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];
  const localVotes = useRecoilValue(localVotesState);
  const favorizedDeputies = useRecoilValue(favorizedDeputiesState);
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
      .map<Omit<DeputyListRenderItemProps, 'onPress'> & { matches: number }>(deputy => ({
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
            party: deputy.party as 'Union' | 'SPD' | 'FDP' | 'Grüne' | 'AfD' | 'Linke',
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
      }))
      .sort((a, b) => b.matches - a.matches) || [];

  const deputiesData = deputies.map(d => ({
    ...d,
    onPress: () => navigation.navigate('DeputyProfile', { id: d.id }),
  }));

  return <DeputyList deputies={deputiesData} favorizedDeputies={favorizedDeputies} />;
};
