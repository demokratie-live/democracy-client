import React from 'react';
import { Text, FlatList, ListRenderItem } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { procedures } from './graphql/query/procedures';
import {
  ProceduresList,
  ProceduresListVariables,
  ProceduresList_procedures,
} from './graphql/query/__generated__/ProceduresList';
import { ListType } from '../../../../__generated__/globalTypes';
import { VoteItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/VoteItem';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { TopTabkParamList } from '../../../routes/Sidebar/Bundestag/TabView';
import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';

type ProfileScreenRouteProp = RouteProp<TopTabkParamList, ListType>;

export const List = () => {
  const route = useRoute<ProfileScreenRouteProp>();
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
      activityIndex: { activityIndex },
      type,
      voteResults,
      votedGovernment,
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
    return (
      <Row
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId,
            title: type || procedureId,
          })
        }>
        <VoteItem
          title={title}
          subline={subline}
          voteDate={voteDate}
          voted={voted}
          votes={activityIndex}
          governmentVotes={govSlices}
        />
      </Row>
    );
  };

  return (
    <FlatList<ProceduresList_procedures>
      testID="ListView"
      removeClippedSubviews
      data={data.procedures}
      renderItem={renderItem}
      keyExtractor={({ procedureId }) => procedureId}
      refreshing={networkStatus === 4}
      ListFooterComponent={() => (networkStatus === 3 ? <ListLoading /> : null)}
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
  );
};
