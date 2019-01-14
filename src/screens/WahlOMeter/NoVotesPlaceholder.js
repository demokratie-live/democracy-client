import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// Components
import WahlOMeterLogo from './WahlOMeterLogo';

import topTabs from '../VoteList/topTabs';

const NoVotesWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})`
  flex-grow: 1;
`;

const Text = styled.Text`
  font-size: 15;
  color: #4a4a4a;
  text-align: center;
`;

const GoToVoteButton = styled.TouchableOpacity`
  background-color: #669dd2;
  padding-horizontal: 18;
  padding-vertical: 18;
`;

const NoVotesPlaceholder = ({ subline, navigator }) => (
  <NoVotesWrapper>
    <WahlOMeterLogo subline={subline} />
    <Text>Diese Auswertung ist erst nach der ersten Abstimmung verfügbar</Text>
    <GoToVoteButton
      onPress={() =>
        navigator.resetTo({
          screen: 'democracy.VoteList',
          title: 'BUNDESTAG',
          topTabs,
          animated: false,
        })
      }
    >
      <Text style={{ color: '#fff' }}>JETZT ABSTIMMEN</Text>
    </GoToVoteButton>
  </NoVotesWrapper>
);

NoVotesPlaceholder.propTypes = {
  subline: PropTypes.string.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default NoVotesPlaceholder;
