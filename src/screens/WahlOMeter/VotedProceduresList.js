import React from 'react';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';

// Components
import ListItem from '../VoteList/ListItem';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';

const VotedProceduresList = ({ onItemClick }) => (
  <Query query={PROCEDURES_WITH_VOTE_RESULTS} variables={{ procedureIds: null }}>
    {({ data, loading, error }) => {
      console.log('VotedProceduresList', data);
      if (!data || !data.proceduresByIdHavingVoteResults) {
        return <ActivityIndicator />;
      }
      return (
        <FlatList
          data={data.proceduresByIdHavingVoteResults.procedures}
          renderItem={({ item }) => <ListItem item={item} onClick={() => onItemClick({ item })} />}
          keyExtractor={({ _id }) => _id}
        />
      );
    }}
  </Query>
);

export default VotedProceduresList;
