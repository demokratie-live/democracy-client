import { DeputyList, DeputyListRenderItemProps } from '@democracy-deutschland/ui';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import unionBy from 'lodash.unionby';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { favorizedDeputiesState } from '../../api/state/favorizedDeputies';
import { parlaments, parlamentState } from '../../api/state/parlament';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';
import { useDeputiesQuery, useFavouriteDeputiesQuery } from '../../__generated__/graphql';

const Spinner = styled(ActivityIndicator)``;

interface DeputyListControllerProps {
  editMode: boolean;
  searchTerm?: string;
  favorizedDeputies: string[];
}

export type DeputyListNavigationProps = DrawerNavigationProp<SidebarParamList, 'Abgeordnete'>;

type ScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Abgeordnete'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const DeputyListController: React.FC<DeputyListControllerProps> = ({
  editMode,
  searchTerm,
  favorizedDeputies,
  ...props
}) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];
  const setFavorizedDeputy = useSetRecoilState(favorizedDeputiesState(parlamentIdentifier));
  const { data, fetchMore, loading, refetch } = useDeputiesQuery({
    variables: {
      limit: 10,
      offset: 0,
      filterTerm: searchTerm ?? undefined,
      excludeIds: [...favorizedDeputies],
      period: parlament.period,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { data: favData } = useFavouriteDeputiesQuery({
    variables: {
      limit: Math.min(favorizedDeputies.length, 100),
      filterIds: [...favorizedDeputies],
      filterTerm: searchTerm ?? undefined,
      period: parlament.period,
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
          party: deputy.party as 'Union' | 'SPD' | 'FDP' | 'Grüne' | 'AfD' | 'Linke',
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

  const removeFavorizedDeputy = (id: string) => {
    setFavorizedDeputy(ids => {
      return ids.filter(idx => idx !== id);
    });
  };

  const addFavorizedDeputy = (id: string) => {
    setFavorizedDeputy(ids => {
      return [...ids, id];
    });
  };

  const deputiesData = deputies.map(d => ({
    ...d,
    onPress: () =>
      !editMode
        ? navigation.navigate('DeputyProfile', { id: d.id })
        : [...favorizedDeputies].includes(d.id)
        ? removeFavorizedDeputy(d.id)
        : addFavorizedDeputy(d.id),
    onStatePress: () =>
      [...favorizedDeputies].includes(d.id)
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
      style={{ flex: 1 }}
      editMode={editMode}
      deputies={deputiesData}
      favorizedDeputies={[...favorizedDeputies]}
      onEndReached={handleOnEndReached}
      ListFooterComponent={() => (loading ? <Spinner /> : null)}
      {...props}
    />
  );
};
