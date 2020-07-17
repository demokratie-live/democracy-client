/* eslint-disable react-native/no-color-literals */
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Background } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Background';
import { Header } from '@democracy-deutschland/mobile-ui/src/components/Sidebar/Header';
import DrawerItemList from './DrawerItemList';
import { RootStackParamList } from '../../routes';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { InitialStateContext } from '../../context/InitialStates';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '../../routes/Sidebar';
import { useQuery } from '@apollo/react-hooks';
import { DONATION_STATUS } from './Donate/graphql/query/donationStatus';
import DonatedBox from './Donate/DonatedBox';
import { Space } from '../modals/Verification/Start';
import { NavigationContext } from '../../context/Navigation';
import { Text } from 'react-native-svg';
import { rateApp } from '../../lib/rateApp';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;
type SidebarNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Sidebar'>,
  DrawerNavigationProp<SidebarParamList>
>;

const DonateBoxWrapper = styled.View`
  height: 68;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const RateBoxWrapper = styled.TouchableOpacity`
  position: absolute;
  justify-content: space-between;
  padding-horizontal: 70;
  bottom: 80;
  left: 0;
  right: 0;
  flex-direction: row;
`;

const Smile = styled.Text`
  font-size: 20;
`;

const DonationTouch = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 68;
`;

const NaviList = styled.ScrollView`
  margin-bottom: 68;
`;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar: React.FC<Props> = props => {
  const navigation = useNavigation<SidebarNavigationProps>();
  const { saveState } = useContext(NavigationContext);
  const { isVerified, verificationQueryRunning } = useContext(
    InitialStateContext,
  );

  const { data } = useQuery(DONATION_STATUS);
  const [donationStatus, setDonationStatus] = useState<any>({});

  useEffect(() => {
    if (!donationStatus.result && data) {
      setDonationStatus(data.donationStatus);
    }
  }, [data, donationStatus]);

  const handleHeaderClick = () => {
    if (isVerified) {
      navigation.navigate('Settings');
    } else {
      saveState();
      navigation.navigate('VerificationStart');
    }
  };

  const headerLabel = verificationQueryRunning
    ? 'verbindet…'
    : isVerified
    ? 'verifizierter Nutzer'
    : 'unverifizierter Nutzer';

  return (
    <Container>
      <Background />
      <SafeAreaView>
        <Header
          onPress={handleHeaderClick}
          label={headerLabel}
          testID="HeaderButton"
        />
        <Space />
        <NaviList>
          <DrawerItemList {...props} />
        </NaviList>
      </SafeAreaView>
      <RateBoxWrapper onPress={rateApp}>
        <Smile>😡</Smile>
        <Smile>😕</Smile>
        <Smile>🤔</Smile>
        <Smile>😊</Smile>
        <Smile>🤩</Smile>
      </RateBoxWrapper>
      {donationStatus && donationStatus.result && (
        <DonateBoxWrapper>
          <DonationTouch onPress={() => navigation.navigate('Donate')}>
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
    </Container>
  );
};
