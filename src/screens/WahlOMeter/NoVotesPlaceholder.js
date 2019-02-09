import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// Components
import WahlOMeterLogo from './WahlOMeterLogo';

const NoVotesWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})`
  flex-grow: 1;
  min-height: 300;
`;

const Text = styled.Text`
  font-size: 15;
  color: #4a4a4a;
  text-align: center;
  padding-horizontal: 18;
`;

const NoVotesPlaceholder = ({ subline }) => (
  <NoVotesWrapper>
    <WahlOMeterLogo subline={subline} />
    <Text>Diese Auswertung ist erst nach der ersten Abstimmung verfügbar</Text>
  </NoVotesWrapper>
);

NoVotesPlaceholder.propTypes = {
  subline: PropTypes.string.isRequired,
};

export default NoVotesPlaceholder;
