import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Platform, ActivityIndicator } from 'react-native';

import BallotBox from './components/BallotBox';

// Components
import NoConstituency from './components/NoConstituency';
import PartyChart from './components/PartyChart';

// GraphQL
// import GET_CONSTITUENCY from '../../graphql/queries/local/constituency';
import Fade from './components/Animations/Fade';
import { BundestagRootStackParamList } from '../../../../routes/Sidebar/Bundestag';
import { RouteProp } from '@react-navigation/core';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 73 : 18,
  },
})`
  flex-grow: 1;
`;

const Title = styled.Text`
  padding-top: 9;
  padding-horizontal: 18;
  font-size: 34;
  padding-bottom: 9;
`;

const WarnWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 130;
  background-color: rgba(0, 0, 0, 0);
`;

const WarnTextWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 11;
  background-color: rgb(255, 255, 255);
  opacity: 0.9;
`;

const WarnText = styled.Text`
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 13;
`;

const BalloutBoxWrapper = styled.View`
  height: 130;
  background-color: rgba(250, 250, 250, 0.9);
  border-top-width: 1;
  border-top-color: rgba(68, 148, 211, 0.1);
`;

type VoteVerificationScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Voting'
>;

interface Props {
  route: VoteVerificationScreenRouteProp;
  navigation: any;
}

export class VoteVerification extends PureComponent<Props> {
  state = {
    showWarning: true,
  };

  onScroll = () => {
    if (this.state.showWarning) {
      this.setState({ showWarning: false });
    }
  };

  render() {
    const { selection } = this.props.route.params;
    // Load constituency from context api
    const data = { constituency: { constituency: null }, loading: false };
    return (
      <Wrapper>
        <ScrollWrapper onScroll={this.onScroll}>
          <Title>Schon gewusst?</Title>
          {data.loading && <ActivityIndicator size="large" />}
          {!data.loading && !data.constituency.constituency && (
            <NoConstituency />
          )}
          {!data.loading && data.constituency.constituency && <PartyChart />}
        </ScrollWrapper>
        <WarnWrapper pointerEvents="none">
          <Fade visible={this.state.showWarning}>
            <WarnTextWrapper>
              <WarnText>
                Deine Stimme ist verbindlich und kann nicht zurückgenommen
                werden
              </WarnText>
            </WarnTextWrapper>
          </Fade>
        </WarnWrapper>
        <BalloutBoxWrapper>
          <BallotBox selection={selection} />
        </BalloutBoxWrapper>
      </Wrapper>
    );
  }
}
