/* eslint-disable no-nested-ternary */
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { graphql, Query } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { Navigator } from 'react-native-navigation';

import Navigation from './Navigation';

import currentScreenQuery from '../../graphql/queries/currentScreen';
import GET_STATISTIC from '../../graphql/queries/getStatistic';

const Wrapper = styled.View`
  flex: 1;
`;

// TODO status background enftfernen, wenn weiß oko ist
const StatusBackground = styled.View`
  background-color: rgba(255, 255, 255, 0);
  height: 20;
`;

const BackgroundWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.Image.attrs({
  source: require('../../../assets/images/stars2.png'),
})`
  resize-mode: ${Platform.OS === 'ios' ? 'repeat' : 'stretch'};
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  flex: 1;
  background-color: rgba(68, 148, 211, 0.2);
`;

const Head = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 16;
  padding-left: 16;
`;

const HeadLogo = styled.Image.attrs({
  source: require('../../../assets/images/logo-sidemenu.png'),
})``;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17;
  padding-left: 16;
`;

const SideMenu = ({ data: { currentScreen }, navigator }) => {
  const navigateTo = ({ screenId, title }) => {
    if (screenId) {
      if (screenId === 'democracy.Instructions') {
        navigator.showModal({
          screen: screenId,
          navigatorStyle: { navBarHidden: true, orientation: 'portrait' },
        });
      } else {
        navigator.handleDeepLink({
          link: screenId,
          payload: { title, from: 'sideMenu' },
        });
      }
    }
    navigator.toggleDrawer({ side: 'left' });
  };
  return (
    <Wrapper>
      <StatusBar barStyle="light-content" />
      <BackgroundWrapper>
        <BackgroundImage />
      </BackgroundWrapper>
      {Platform.OS === 'ios' && <StatusBackground />}
      <Query query={GET_STATISTIC} fetchPolicy="cache-and-network">
        {({ loading, data: { voteStatistic } }) => {
          let verified = null;
          if (!loading && !voteStatistic) verified = false;
          if (!loading && voteStatistic) verified = true;

          return (
            <Content>
              <Head
                onPress={() => {
                  if (!loading && !voteStatistic) {
                    navigator.showModal({
                      screen: 'democracy.SmsVerification',
                    });
                  } else if (!loading && voteStatistic) {
                    navigateTo({
                      screenId: 'democracy.Statistic',
                      title: 'Statisitk'.toUpperCase(),
                    });
                  }
                }}
              >
                <HeadLogo />
                <HeadTextWrapper>
                  <HeadText>
                    {loading
                      ? '…'
                      : voteStatistic ? 'verifizierter Nutzer' : 'unverifizierter Nutzer'}
                  </HeadText>
                </HeadTextWrapper>
              </Head>
              <Navigation
                currentScreen={currentScreen}
                navigateTo={navigateTo}
                verified={verified}
              />
            </Content>
          );
        }}
      </Query>
    </Wrapper>
  );
};

SideMenu.propTypes = {
  data: PropTypes.shape().isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default graphql(currentScreenQuery)(SideMenu);
