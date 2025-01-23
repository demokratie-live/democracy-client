import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Space } from '../../components/Space';

// Components
import WahlOMeterLogo from './WahlOMeterLogo';

const NoVotesWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  padding-top: 18px;
  flex-grow: 1;
  min-height: 300px;
`;

const Text = styled.Text`
  font-size: 15px;
  color: #4a4a4a;
  text-align: center;
  padding-horizontal: 18px;
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
        <Space space={18} />
        <Text>Diese Auswertung ist erst nach der ersten Abstimmung verfügbar</Text>
        <Space space={18} />
      </NoVotesWrapper>
    );
  }
}

export default NoVotesPlaceholder;
