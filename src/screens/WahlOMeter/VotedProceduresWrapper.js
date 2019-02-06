import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { unionBy } from 'lodash';

// GraphQL
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';
import ListItem from '../VoteList/ListItem';

const Wrapper = styled.FlatList`
  background-color: #fff;
  padding-top: 18;
`;

const VotedProceduresWrapper = ({ onProcedureListItemClick, children }) => {
  let hasMore = true;

  return (
    <Query
      query={PROCEDURES_WITH_VOTE_RESULTS}
      variables={{ procedureIds: null, offset: 0, limit: 10 }}
      fetchPolicy="cache-and-network"
    >
      {({ data, fetchMore }) => {
        if (!data || !data.proceduresByIdHavingVoteResults) {
          return children;
        }

        return (
          <Wrapper
            data={['chart', ...data.proceduresByIdHavingVoteResults.procedures]}
            renderItem={({ item }) =>
              item === 'chart' ? (
                children
              ) : (
                <ListItem item={item} onClick={() => onProcedureListItemClick({ item })} />
              )
            }
            keyExtractor={({ procedureId }) => (procedureId ? procedureId : 'chart')}
            onEndReached={() =>
              hasMore &&
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
                    hasMore = false;

                  prev.proceduresByIdHavingVoteResults.procedures;
                  return Object.assign({}, prev, {
                    proceduresByIdHavingVoteResults: {
                      ...prev.proceduresByIdHavingVoteResults,
                      procedures: unionBy(
                        prev.proceduresByIdHavingVoteResults.procedures,
                        fetchMoreResult.proceduresByIdHavingVoteResults.procedures,
                        '_id',
                      ),
                    },
                  });
                },
              })
            }
          />
        );
      }}
    </Query>
  );
};

VotedProceduresWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default VotedProceduresWrapper;
