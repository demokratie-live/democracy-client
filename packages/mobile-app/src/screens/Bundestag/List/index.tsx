import React, { useState, useContext } from 'react';
import { Text, ListRenderItem, SectionList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { procedures } from './graphql/query/procedures';
import {
  ProceduresList,
  ProceduresListVariables,
  ProceduresList_procedures,
} from './graphql/query/__generated__/ProceduresList';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { TopTabParamList } from '../../../routes/Sidebar/Bundestag/TabView';
import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';
import styled from 'styled-components/native';
import { Segment } from './Components/Segment';
import { ListType } from '../../../../__generated__/globalTypes';
import { LocalVotesContext } from '../../../context/LocalVotes';

type ListScreenRouteProp = RouteProp<
  TopTabParamList,
  'DEV' | 'Sitzungswoche' | 'Top 100' | 'Vergangen'
>;

export interface SegmentedData {
  title: string;
  data: ProceduresList_procedures[];
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const List = () => {
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const route = useRoute<ListScreenRouteProp>();
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  const [hasMore, setHasMore] = useState(true);
  const { loading, data, error, fetchMore, networkStatus, refetch } = useQuery<
    ProceduresList,
    ProceduresListVariables
  >(procedures, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    variables: {
      listTypes: [route.params.list],
      pageSize: 10,
    },
  });

  if (loading) {
    return <ListLoading />;
  }

  if (error) {
    return <Text>some error: {error.message}</Text>;
  }

  if (!data) {
    return <Text>some error: No Data</Text>;
  }

  if (
    route.params.list === ListType.CONFERENCEWEEKS_PLANNED &&
    data.procedures.length === 0
  ) {
    // TODO missing UI
    return (
      <Text>Noch keine daten für die nächste Sitzungswoche vorhanden</Text>
    );
  }

  const segmentedData = data.procedures.reduce<SegmentedData[]>(
    (prev, procedure) => {
      const { voteWeek, voteYear } = procedure;
      const segment = `KW ${voteWeek}/${voteYear}`;
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
    },
    [],
  );

  const renderItem: ListRenderItem<ProceduresList_procedures> = ({
    item: {
      procedureId,
      title,
      sessionTOPHeading,
      subjectGroups,
      voteDate,
      voteEnd,
      voted,
      type,
      voteResults,
      votedGovernment,
      communityVotes,
    },
  }) => {
    // If no session top headings available use subject groups
    let subline = null;
    if (sessionTOPHeading) {
      subline = sessionTOPHeading;
    } else if (subjectGroups) {
      subline = subjectGroups.join(', ');
    }
    let govSlices: Slice[] | undefined;
    if (votedGovernment && voteResults) {
      // TODO improve graphql types for this
      const sumVotes =
        (voteResults.yes || 0) +
        (voteResults.abstination || 0) +
        (voteResults.no || 0);
      govSlices = [
        {
          color: '#99C93E',
          percent: (voteResults.yes || 0) / sumVotes,
          large: voteResults.governmentDecision === 'YES',
        },
        {
          color: '#4CB0D8',
          percent: (voteResults.abstination || 0) / sumVotes,
          large: voteResults.governmentDecision === 'ABSTINATION',
        },
        {
          color: '#D43194',
          percent: (voteResults.no || 0) / sumVotes,
          large: voteResults.governmentDecision === 'NO',
        },
      ];
    }

    // TODO improve Graphql Types
    const communityVoteData: Slice[] = communityVotes
      ? [
          {
            percent: (communityVotes.yes || 0) / (communityVotes.total || 0),
            color: voted ? '#16C063' : '#C7C7CC',
            large: getLocalVoteSelection(procedureId) === 'YES',
          },
          {
            percent:
              (communityVotes.abstination || 0) / (communityVotes.total || 0),
            color: voted ? '#2882E4' : '#D8D8D8',
            large: getLocalVoteSelection(procedureId) === 'ABSTINATION',
          },
          {
            percent: (communityVotes.no || 0) / (communityVotes.total || 0),
            color: voted ? '#EC3E31' : '#B0AFB7',
            large: getLocalVoteSelection(procedureId) === 'NO',
          },
        ]
      : [{ percent: 1, color: '#d8d8d8', large: true }];

    return (
      <Row
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId,
            title: type || procedureId,
          })
        }>
        <ListItem
          title={title}
          subline={subline}
          voteDate={voteDate}
          endDate={voteEnd}
          voted={voted}
          votes={communityVotes ? communityVotes.total || 0 : 0}
          governmentVotes={govSlices}
          communityVotes={communityVoteData}
        />
      </Row>
    );
  };

  return (
    <Container>
      <SectionList<ProceduresList_procedures>
        sections={segmentedData}
        stickySectionHeadersEnabled
        renderSectionHeader={({ section }) =>
          route.params.list !== 'TOP100' ? (
            <Segment text={section.title} />
          ) : null
        }
        testID="ListView"
        renderItem={renderItem}
        keyExtractor={({ procedureId }) => procedureId}
        refreshing={networkStatus === 4}
        ListFooterComponent={() => (hasMore ? <ListLoading /> : null)}
        onRefresh={refetch}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          !loading &&
            hasMore &&
            fetchMore({
              variables: {
                offset: data.procedures.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return prev;
                }

                if (fetchMoreResult.procedures.length === 0) {
                  setHasMore(false);
                }

                const newProcedureList = [
                  ...prev.procedures,
                  ...fetchMoreResult.procedures,
                ];

                return Object.assign({}, prev, {
                  procedures: newProcedureList.filter(
                    (s1, pos, arr) =>
                      arr.findIndex(s2 => s2.procedureId === s1.procedureId) ===
                      pos,
                  ),
                });
              },
            });
        }}
      />
    </Container>
  );
};
