/* eslint-disable no-nested-ternary */
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { graphql, Query, compose } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { Navigator } from 'react-native-navigation';

import Navigation from './Navigation';
import DonatedBox from '../Donate/DonatedBox';

// GraphQL
import currentScreenQuery from '../../graphql/queries/currentScreen';
import GET_STATISTIC from '../../graphql/queries/getStatistic';
import DONATION_STATUS from '../../graphql/queries/donationStatus';
import GET_CONSTITUENCY from '../../graphql/queries/local/constituency';

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

const BackgroundImage = styled.Image.attrs(() => ({
  source: require('../../../assets/images/stars2.png'),
}))`
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
  padding-bottom: 8;
`;

const HeadLogo = styled.Image.attrs(() => ({
  source: require('../../../assets/images/logo-sidemenu.png'),
}))``;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17;
  padding-left: 16;
`;

const DonateBoxWrapper = styled.View`
  height: 68;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const DonationTouch = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 68;
`;

const SideMenu = ({ donationStatus, data: { currentScreen }, navigator, constituency }) => {
  const navigateTo = ({ screenId, title }) => {
    if (screenId) {
      if (screenId === 'democracy.Instructions') {
        navigator.showModal({
          screen: screenId,
          navigatorStyle: { navBarHidden: true, orientation: 'portrait' },
        });
      } else if (screenId === 'democracy.SmsVerification') {
        navigator.showModal({
          screen: screenId,
          navigatorStyle: { navBarHidden: false, orientation: 'portrait' },
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
  const donate = () => {
    navigateTo({
      screenId: 'democracy.Donate',
      title: 'Unterstütze DEMOCRACY'.toUpperCase(),
    });
  };

  return (
    <Wrapper>
      <StatusBar barStyle="light-content" />
      <BackgroundWrapper>
        <BackgroundImage />
      </BackgroundWrapper>
      {Platform.OS === 'ios' && <StatusBackground />}
      <Query query={GET_STATISTIC} fetchPolicy="cache-and-network">
        {({ loading, data }) => {
          let verified = null;
          const voteStatistic = data ? data.voteStatistic : null;
          if (!loading && !voteStatistic) verified = false;
          if (!loading && voteStatistic) verified = true;

          return (
            <Content>
              {Platform.OS === 'ios' && <StatusBackground />}
              <Head
                onPress={() => {
                  if (!loading && !voteStatistic) {
                    navigator.showModal({
                      screen: 'democracy.SmsVerification',
                    });
                  } else if (!loading && voteStatistic) {
                    navigateTo({
                      screenId: 'democracy.Profil',
                      title: 'Profil'.toUpperCase(),
                    });
                  }
                }}
              >
                <HeadLogo />
                <HeadTextWrapper>
                  <HeadText>
                    {loading
                      ? '…'
                      : voteStatistic
                      ? `verifizierter Nutzer${constituency ? '\nWahlkreis ' + constituency : ''}`
                      : 'unverifizierter Nutzer'}
                  </HeadText>
                </HeadTextWrapper>
              </Head>
              <Navigation
                currentScreen={currentScreen}
                navigateTo={navigateTo}
                verified={verified}
              />
              {donationStatus && donationStatus.result && (
                <DonateBoxWrapper>
                  <DonationTouch onPress={donate}>
                    <DonatedBox
                      style={{ backgroundColor: '#4494d390' }}
                      descriptionTextStyle={{ color: '#fff' }}
                      moneyTextStyle={{ color: '#fff' }}
                      target={donationStatus.result.donation_value_goal}
                      occupied={donationStatus.result.donation_value}
                    />
                  </DonationTouch>
                </DonateBoxWrapper>
              )}
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
  donationStatus: PropTypes.shape(),
  constituency: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

SideMenu.defaultProps = {
  donationStatus: {},
  constituency: false,
};

export default compose(
  graphql(currentScreenQuery),
  graphql(DONATION_STATUS, {
    props: ({ data: { donationStatus } }) => ({
      donationStatus,
    }),
  }),
  graphql(GET_CONSTITUENCY, {
    fetchPolicy: 'no-cache',
    props: ({ data: { constituency } }) => {
      return {
        constituency: constituency && constituency.constituency,
      };
    },
  }),
)(SideMenu);
