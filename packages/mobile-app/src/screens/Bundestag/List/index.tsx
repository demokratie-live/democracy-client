import React from 'react';
import { Text, ListRenderItem, FlatList } from 'react-native';
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

type ListScreenRouteProp = RouteProp<
  TopTabParamList,
  'DEV' | 'Sitzungswoche' | 'Top 100' | 'Vergangen'
>;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const List = () => {
  const route = useRoute<ListScreenRouteProp>();
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();

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
    return <Text>…loading</Text>;
  }

  if (error) {
    return <Text>some error: {error.message}</Text>;
  }

  if (!data) {
    return <Text>some error: No Data</Text>;
  }

  const renderItem: ListRenderItem<ProceduresList_procedures> = ({
    item: {
      procedureId,
      title,
      sessionTOPHeading,
      subjectGroups,
      voteDate,
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
          },
          {
            percent:
              (communityVotes.abstination || 0) / (communityVotes.total || 0),
            color: voted ? '#2882E4' : '#D8D8D8',
          },
          {
            percent: (communityVotes.no || 0) / (communityVotes.total || 0),
            color: voted ? '#EC3E31' : '#B0AFB7',
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
      <FlatList<ProceduresList_procedures>
        testID="ListView"
        data={data.procedures}
        renderItem={renderItem}
        keyExtractor={({ procedureId }) => procedureId}
        refreshing={networkStatus === 4}
        ListFooterComponent={() =>
          networkStatus === 3 ? <ListLoading /> : null
        }
        onRefresh={refetch}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          fetchMore({
            variables: {
              offset: data.procedures.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
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
