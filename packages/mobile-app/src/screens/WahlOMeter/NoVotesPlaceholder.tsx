import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

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

interface Props {
  subline: string;
}

class NoVotesPlaceholder extends PureComponent<Props> {
  render() {
    const { subline } = this.props;
    return (
      <NoVotesWrapper>
        <WahlOMeterLogo subline={subline} />
        <Text>
          Diese Auswertung ist erst nach der ersten Abstimmung verfügbar
        </Text>
      </NoVotesWrapper>
    );
  }
}

export default NoVotesPlaceholder;
