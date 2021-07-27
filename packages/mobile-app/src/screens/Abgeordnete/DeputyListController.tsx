import { useQuery } from '@apollo/client';
import {
  DeputyList,
  DeputyListRenderItemProps,
} from '@democracy-deutschland/ui';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import unionBy from 'lodash.unionby';
import React, { useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { FavorizedDeputiesContext } from '../../lib/states/FavorizedDeputies';
import { FavorizedDeputiesStore } from '../../lib/stores/FavorizedDeputies';
import { SidebarParamList } from '../../routes/Sidebar';
import { AbgeordneteRootStackParamList } from '../../routes/Sidebar/Abgeordnete';
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
  favorizedDeputies: FavorizedDeputiesStore;
}

export type DeputyListNavigationProps = CompositeNavigationProp<
  StackNavigationProp<AbgeordneteRootStackParamList, 'Abgeordnete'>,
  DrawerNavigationProp<SidebarParamList>
>;

export const DeputyListController: React.FC<DeputyListControllerProps> = ({
  editMode,
  searchTerm,
  favorizedDeputies,
  ...props
}) => {
  const navigation = useNavigation();
  const { addFavorizedDeputy, removeFavorizedDeputy } = useContext(
    FavorizedDeputiesContext,
  );
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
      limit: Math.min(favorizedDeputies.length, 100),
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
    [...(favData?.deputies.data ?? []), ...(data?.deputies.data ?? [])].map<
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
    onPress: () => navigation.navigate('DeputyProfile', { id: d.id }),
    onStatePress: () =>
      favorizedDeputies.includes(d.id)
        ? removeFavorizedDeputy(d.id)
        : addFavorizedDeputy(d.id),
  }));

  const handleOnEndReached = () => {
    if (!loading && data?.deputies.hasMore) {
      fetchMore({
        variables: { offset: data.deputies.data.length },
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
