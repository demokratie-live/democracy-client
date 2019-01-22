import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';

// Components
import ListItem from '../VoteList/ListItem';
import ListSectionHeader from '../../components/ListSectionHeader';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';

const ActivityIndicator = styled.ActivityIndicator`
  height: 36;
  padding-bottom: 18;
`;

const ProcedureList = styled.View`
  padding-bottom: 18;
`;

class VotedProceduresList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    hasMore: true,
  };

  render() {
    const { onItemClick } = this.props;
    const { hasMore } = this.state;
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
                if (
                  hasMore &&
                  fetchMoreResult.proceduresByIdHavingVoteResults.procedures.length === 0
                )
                  this.setState({ hasMore: false });

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
            <ProcedureList ref={this.myRef}>
              <ListSectionHeader title="Abstimmungen" />
              {data.proceduresByIdHavingVoteResults.procedures.map(item => (
                <ListItem
                  key={item.procedureId}
                  item={item}
                  onClick={() => onItemClick({ item })}
                />
              ))}
              {hasMore && <ActivityIndicator />}
            </ProcedureList>
          );
        }}
      </Query>
    );
  }
}

VotedProceduresList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default VotedProceduresList;
