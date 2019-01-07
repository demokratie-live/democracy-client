import React from 'react';
import styled from 'styled-components/native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// Components
import NoVotesPlaceholder from '../NoVotesPlaceholder';

// GraphQL
import VOTES_LOCAL from '../../../graphql/queries/votesLocalKeyStore';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Bundestag = ({ navigator }) => (
  <Wrapper>
    <Query query={VOTES_LOCAL} fetchPolicy="network-only">
      {({ data }) => {
        console.log('VOTES_LOCAL', data.votesLocalKeyStore);
        if (!data.votesLocalKeyStore || data.votesLocalKeyStore.length === 0) {
          return <NoVotesPlaceholder subline="Bundestag" navigator={navigator} />;
        }
        return null;
      }}
    </Query>
  </Wrapper>
);

Bundestag.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Bundestag;
