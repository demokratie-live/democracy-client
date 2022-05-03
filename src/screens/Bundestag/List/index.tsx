import React, { useState, useEffect } from 'react';
import { Text, ListRenderItem, SectionList, SectionListProps } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { Segment } from './Components/Segment';
import { communityVoteData } from '../../../lib/PieChartCommunityData';
import { NoConferenceWeekData } from './NoConferenceWeekData';
import { BundestagTopTabParamList } from '../../../routes/Bundestag';
import styled from 'styled-components/native';
import { localVotesState } from '../../../api/state/votesLocal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes';
import { parlaments, parlamentState } from '../../../api/state/parlament';
import { useRecoilValue } from 'recoil';
import { useListFilter } from '../../../api/hooks/useListFilter';
import { constituencyState } from '../../../api/state/constituency';
import { ListLoading } from '../../../components/ListLoading';
import { Centered } from '../../../components/Centered';
import { Button } from '../../../components/Button';
import {
  ListType,
  ProceduresListQuery,
  useProceduresListQuery,
} from '../../../__generated__/graphql';
import { pieChartGovernmentData } from '../../../lib/PieChartGovernmentData';
import { Row } from '../../../components/Row';
import { ListItem } from '../../../components/ListItem/index.';

type ListScreenRouteProp = RouteProp<
  BundestagTopTabParamList,
  'DEV' | 'Sitzungswoche' | 'Top 100' | 'Vergangen'
>;

export interface SegmentedData {
  title: string;
  data: ProceduresListQuery['procedures'];
}

type Item = ProceduresListQuery['procedures'][0];

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const List = () => {
  const localVotes = useRecoilValue(localVotesState);
  const { proceduresFilter } = useListFilter();
  const constituency = useRecoilValue(constituencyState);
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];
  const constituencies = constituency ? [constituency] : [];
  const route = useRoute<ListScreenRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasMore, setHasMore] = useState(true);
  console.log(parlament.period);
  const { loading, data, error, fetchMore, networkStatus, refetch } = useProceduresListQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    variables: {
      listTypes: [route.params.list],
      pageSize: 10,
      filter: proceduresFilter,
      constituencies,
      period: parlament.period,
    },
  });

  useEffect(() => {
    setHasMore(true);
  }, [proceduresFilter]);

  if (loading) {
    return (
      <Container>
        <ListLoading />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <Centered>
          <Text>Verbindungsfehler</Text>
          <Button
            onPress={() => {
              refetch({
                listTypes: [route.params.list],
                pageSize: 10,
                filter: proceduresFilter,
                constituencies,
              });
            }}
            text="Nochmal versuchen"
            textColor="blue"
            backgroundColor="transparent"
          />
        </Centered>
      </Container>
    );
  }

  if (data.procedures.length === 0) {
    return <NoConferenceWeekData />;
  }
  let segmentedData: SegmentedData[];

  // Do not sort top 100 list
  if (ListType.Top100 === route.params.list) {
    segmentedData = [
      {
        title: '',
        data: data.procedures,
      },
    ];
  } else {
    segmentedData = data.procedures.reduce<SegmentedData[]>((prev, procedure) => {
      const { voteWeek, voteYear } = procedure;
      const segment = voteWeek && voteYear ? `KW ${voteWeek}/${voteYear}` : '';
      const index = prev.findIndex(({ title }) => title === segment);
      if (index !== -1) {
        return Object.assign([...prev], {
          [index]: { title: segment, data: [...prev[index].data, procedure] },
        });
      }
      return [
        ...prev,
        {
          title: segment,
          data: [procedure],
        },
      ];
    }, []);
  }

  const renderItem: ListRenderItem<Item> = ({
    item: {
      procedureId,
      title,
      sessionTOPHeading,
      subjectGroups,
      voteDate,
      voteEnd,
      voted: votedServer,
      type,
      voteResults,
      votedGovernment,
      communityVotes,
    },
    index,
  }) => {
    // If no session top headings available use subject groups
    let subline = null;
    if (sessionTOPHeading) {
      subline = sessionTOPHeading;
    } else if (subjectGroups) {
      subline = subjectGroups.join(', ');
    }

    const govSlices = pieChartGovernmentData({
      voteResults,
      votedGovernment,
    });

    const localSelection = localVotes.find(
      localVote => localVote.procedureId === procedureId,
    )?.selection;
    const voted = votedServer || !!localSelection;

    const communityVoteSlices = communityVoteData({
      communityVotes,
      localSelection,
      voted,
    });

    return (
      <Row
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId,
            title: type || procedureId,
          })
        }
        testID={`ListItem-${route.params.list}-${index}`}
      >
        <ListItem
          title={title}
          subline={subline}
          voteDate={voteDate ? new Date(voteDate) : undefined}
          endDate={voteEnd ? new Date(voteEnd) : undefined}
          voted={voted}
          votes={communityVotes ? communityVotes.total || 0 : 0}
          govermentChart={{
            votes: govSlices,
            large: true,
          }}
          communityVotes={communityVoteSlices}
        />
      </Row>
    );
  };

  const renderSectionHeader: SectionListProps<Item, SegmentedData>['renderSectionHeader'] = ({
    section,
  }) => (route.params.list !== 'TOP100' && section.title ? <Segment text={section.title} /> : null);

  return (
    <Container>
      <SectionList<Item, SegmentedData>
        sections={segmentedData}
        stickySectionHeadersEnabled
        renderSectionHeader={renderSectionHeader}
        testID="ListView"
        renderItem={renderItem}
        keyExtractor={({ procedureId }) => procedureId}
        refreshing={networkStatus === 4}
        ListFooterComponent={() => (hasMore ? <ListLoading /> : null)}
        onRefresh={() => {
          setHasMore(true);
          refetch();
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          !loading &&
            hasMore &&
            fetchMore({
              variables: {
                offset: data.procedures.length,
              },
            }).then(({ data: fetchMoreData }) => {
              if (fetchMoreData.procedures.length === 0) {
                setHasMore(false);
              }
            });
        }}
      />
    </Container>
  );
};
