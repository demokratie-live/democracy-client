import {
  DeputyList,
  DeputyListRenderItemProps,
} from "@democracy-deutschland/ui";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import unionBy from "lodash.unionby";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useFavorizedDeputiesStore } from "../../api/state/favorizedDeputies";
import { ParlamentIdentifier, parlaments } from "../../api/state/parlament";
import {
  useDeputiesQuery,
  useFavouriteDeputiesQuery,
} from "../../__generated__/graphql";
import { SidebarParamList } from "../../app/(sidebar)/_layout";
import { useRouter } from "expo-router";

const Spinner = styled(ActivityIndicator)``;

interface DeputyListControllerProps {
  editMode: boolean;
  searchTerm?: string;
  favorizedDeputies: string[];
  parlamentIdentifier: ParlamentIdentifier;
}

export type DeputyListNavigationProps = DrawerNavigationProp<
  SidebarParamList,
  "Abgeordnete"
>;

export const DeputyListController: React.FC<DeputyListControllerProps> = ({
  editMode,
  searchTerm,
  favorizedDeputies,
  parlamentIdentifier,
  ...props
}) => {
  const router = useRouter();
  const parlament = parlaments[parlamentIdentifier];
  const { addDeputy, removeDeputy } = useFavorizedDeputiesStore();
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
      Omit<DeputyListRenderItemProps, "onPress">
    >((deputy) => ({
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
      subtitle:
        deputy.party && deputy.constituency
          ? `${deputy.party}, Wahlkreis: ${deputy.constituency}`
          : deputy.party
          ? deputy.party
          : undefined,
    })) || [];

  unionBy(deputies, (deputy) => deputy.id);

  const removeFavorizedDeputy = (id: string) => {
    removeDeputy(parlamentIdentifier, id);
  };

  const addFavorizedDeputy = (id: string) => {
    addDeputy(parlamentIdentifier, id);
  };

  const deputiesData = deputies.map((d) => ({
    ...d,
    onPress: () =>
      !editMode
        ? router.push(`/DeputyProfile/${d.id}`)
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
