import React, { Component } from 'react';
import { FlatList, Text, ActivityIndicator, View } from 'react-native';
import { Query } from 'react-apollo';

// Components
import ListItem from '../VoteList/ListItem';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';

class VotedProceduresList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    const { onItemClick } = this.props;
    return (
      <Query
        query={PROCEDURES_WITH_VOTE_RESULTS}
        variables={{ procedureIds: null, offset: 0, limit: 10 }}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore }) => {
          if (!data || !data.proceduresByIdHavingVoteResults) {
            return <ActivityIndicator />;
          }

          this.fetchMore = () => {
            fetchMore({
              variables: {
                offset: data.proceduresByIdHavingVoteResults.procedures.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                prev.proceduresByIdHavingVoteResults.procedures;
                return Object.assign({}, prev, {
                  proceduresByIdHavingVoteResults: {
                    ...prev.proceduresByIdHavingVoteResults,
                    procedures: [
                      ...prev.proceduresByIdHavingVoteResults.procedures,
                      ...fetchMoreResult.proceduresByIdHavingVoteResults.procedures,
                    ],
                  },
                });
              },
            });
          };

          return (
            <View ref={this.myRef}>
              {data.proceduresByIdHavingVoteResults.procedures.map(item => (
                <ListItem
                  key={item.procedureId}
                  item={item}
                  onClick={() => onItemClick({ item })}
                />
              ))}
            </View>
          );
        }}
      </Query>
    );
  }
}
export default VotedProceduresList;
