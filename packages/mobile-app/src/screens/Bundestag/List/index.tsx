import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { procedures } from './graphql/query/procedures';
import {
  ProceduresList,
  ProceduresListVariables,
} from './graphql/query/__generated__/ProceduresList';
import { ListType } from '../../../../__generated__/globalTypes';

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

  return (
    <View testID="ListView">
      {data.procedures.map(({ procedureId, title }) => (
        <Text key={procedureId}>{title}</Text>
      ))}
    </View>
  );
};
