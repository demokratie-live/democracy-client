import { useQuery } from '@apollo/client';
import {
  DeputyList,
  DeputyListRenderItemProps,
} from '@democracy-deutschland/ui';
import { useNavigation } from '@react-navigation/core';
import unionBy from 'lodash.unionby';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useFavorizedDeputies } from '../../lib/hooks/FavorizedDeputies';
import { DEPUTY_FAVOURITES, DEPUTY_SEARCH } from './graphql/query/deputies';
import {
  Deputies,
  DeputiesVariables,
} from './graphql/query/__generated__/Deputies';
import {
  FavouriteDeputies,
  FavouriteDeputiesVariables,
} from './graphql/query/__generated__/FavouriteDeputies';

const Spinner = styled(ActivityIndicator)``;

interface DeputyListControllerProps {
  editMode: boolean;
  searchTerm?: string;
}

export const DeputyListController: React.FC<DeputyListControllerProps> = ({
  editMode,
  searchTerm,
  ...props
}) => {
  const navigation = useNavigation();
  const {
    favorizedDeputies,
    addFavorizedDeputy,
    removeFavorizedDeputy,
  } = useFavorizedDeputies();
  const { data, fetchMore, loading, refetch } = useQuery<
    Deputies,
    DeputiesVariables
  >(DEPUTY_SEARCH, {
    variables: {
      limit: 10,
      offset: 0,
      filterTerm: searchTerm ?? undefined,
      excludeIds: favorizedDeputies,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: favData } = useQuery<
    FavouriteDeputies,
    FavouriteDeputiesVariables
  >(DEPUTY_FAVOURITES, {
    variables: {
      limit: favorizedDeputies.length,
      filterIds: favorizedDeputies,
      filterTerm: searchTerm ?? undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch({
      filterTerm: searchTerm ?? undefined,
    });
  }, [refetch, searchTerm]);

  const deputies =
    [...(favData?.deputies ?? []), ...(data?.deputies ?? [])].map<
      Omit<DeputyListRenderItemProps, 'onPress'>
    >(deputy => ({
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
      subtitle:
        deputy.party && deputy.constituency
          ? `${deputy.party}, Wahlkreis: ${deputy.constituency}`
          : deputy.party
          ? deputy.party
          : undefined,
    })) || [];

  unionBy(deputies, deputy => deputy.id);

  const deputiesData = deputies.map(d => ({
    ...d,
    onPress: () => navigation.navigate('MemberProfil'),
    onStatePress: () =>
      favorizedDeputies.includes(d.id)
        ? removeFavorizedDeputy(d.id)
        : addFavorizedDeputy(d.id),
  }));

  const handleOnEndReached = () => {
    if (!loading) {
      fetchMore({
        variables: { offset: deputiesData.length },
      });
    }
  };

  return (
    <DeputyList
      editMode={editMode}
      deputies={deputiesData}
      favorizedDeputies={favorizedDeputies}
      onEndReached={handleOnEndReached}
      ListFooterComponent={() => (loading ? <Spinner /> : null)}
      {...props}
    />
  );
};
