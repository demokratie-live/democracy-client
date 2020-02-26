import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, ActivityIndicator } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';

import Fade from '../../components/Animations/Fade';
import BallotBox from './BallotBox';

// Components
import NoConstituency from './NoConstituency';
import PartyChart from './PartyChart';

// GraphQL
import GET_CONSTITUENCY from '../../graphql/queries/local/constituency';

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
  background-color: rgb(255, 255, 255)
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

class VoteVerification extends PureComponent {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

    if (Platform.OS === 'ios') {
      Ionicons.getImageSource('ios-arrow-back', 34, '#FFFFFF').then(icon => {
        props.navigator.setButtons({
          leftButtons: [
            {
              icon,
              id: 'closeModal',
            },
          ],
        });
      });
    }
  }

  state = {
    showWarning: true,
  };

  onScroll = () => {
    if (this.state.showWarning) {
      this.setState({ showWarning: false });
    }
  };

  render() {
    const { selection, procedureObjId, procedureId, navigator, data } = this.props;
    return (
      <Wrapper>
        <ScrollWrapper onScroll={this.onScroll}>
          <Title>Schon gewusst?</Title>
          {data.loading && <ActivityIndicator size="large" />}
          {!data.loading && !data.constituency.constituency && (
            <NoConstituency navigator={navigator} />
          )}
          {!data.loading && data.constituency.constituency && <PartyChart navigator={navigator} />}
        </ScrollWrapper>
        <WarnWrapper pointerEvents="none">
          <Fade visible={this.state.showWarning}>
            <WarnTextWrapper>
              <WarnText>Deine Stimme ist verbindlich und kann nicht zurückgenommen werden</WarnText>
            </WarnTextWrapper>
          </Fade>
        </WarnWrapper>
        <BalloutBoxWrapper>
          <BallotBox
            selection={selection}
            procedureObjId={procedureObjId}
            procedureId={procedureId}
            navigator={navigator}
          />
        </BalloutBoxWrapper>
      </Wrapper>
    );
  }
}

VoteVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  selection: PropTypes.string.isRequired,
  procedureId: PropTypes.string.isRequired,
  procedureObjId: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired,
};
export default graphql(GET_CONSTITUENCY)(VoteVerification);
