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

export const List = () => {
  const { loading, data, error } = useQuery<
    ProceduresList,
    ProceduresListVariables
  >(procedures, {
    variables: {
      listTypes: [ListType.IN_VOTE],
      pageSize: 10,
    },
  });
  if (loading || !data) {
    return <Text>…loading</Text>;
  }
  if (error) {
    return <Text>some error: {error.message}</Text>;
  }

  const renderItem: ListRenderItem<ProceduresList_procedures> = ({
    item: {
      title,
      subjectGroups,
      voteDate,
      voted,
      activityIndex: { activityIndex },
    },
  }) => {
    return (
      <Row onPress={() => {}}>
        <VoteItem
          title={title}
          subline={subjectGroups && subjectGroups.join(',')}
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
    />
  );
};
