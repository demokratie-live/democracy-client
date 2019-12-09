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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { TopTabkParamList } from '../../../routes/Sidebar/Bundestag/TabView';

type ProfileScreenRouteProp = RouteProp<TopTabkParamList, ListType>;

export const List = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();

  const { loading, data, error, fetchMore, networkStatus } = useQuery<
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
    },
  }) => {
    // If no session top headings available use subject groups
    let subline = null;
    if (sessionTOPHeading) {
      subline = sessionTOPHeading;
    } else if (subjectGroups) {
      subline = subjectGroups.join(', ');
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
        />
      </Row>
    );
  };

  return (
    <FlatList<ProceduresList_procedures>
      testID="ListView"
      data={data.procedures}
      renderItem={renderItem}
      keyExtractor={({ procedureId }) => procedureId}
      refreshing={networkStatus === 4}
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
