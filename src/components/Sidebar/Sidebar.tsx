import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import DrawerItemList from "./DrawerItemList";
import { DrawerItem } from "@react-navigation/drawer";
import { useQuery } from "@apollo/client";
import { ParlamentsNavi } from "./Parlaments/Parlaments";
import { Background } from "./Background";
import { Header } from "./Header";
import { useInitialState } from "../../api/state/initialState";
import { RestDonation } from "../../api/apollo/@types/restDonation";
import { DONATION_STATUS } from "../../screens/Donate/graphql/query/donationStatus";
import DonatedBox from "../../screens/Donate/DonatedBox";
import { rateApp } from "../../lib/rateApp";
import { router } from "expo-router";
import { useDevModeStore } from "src/api/state/dev";

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
`;

const DonateBoxWrapper = styled.View`
  height: 68px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const DonationTouch = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 68px;
`;

const NaviList = styled.ScrollView`
  margin-bottom: 34px;
`;

export type SidebarProps = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { isVerified, verificationQueryRunning } = useInitialState();
  const { data } = useQuery<{ donationStatus: RestDonation }>(DONATION_STATUS);
  const [donationStatus, setDonationStatus] = useState<RestDonation>();
  const { devMode } = useDevModeStore();

  useEffect(() => {
    if (!donationStatus?.result && data) {
      setDonationStatus(data.donationStatus);
    }
  }, [data, donationStatus]);

  const handleHeaderClick = () => {
    if (isVerified) {
      router.push("/Settings");
    } else {
      router.push("/(verification)/VerificationStart");
    }
  };

  const headerLabel = verificationQueryRunning
    ? "verbindet…"
    : isVerified
    ? "verifizierter Nutzer"
    : "unverifizierter Nutzer";

  return (
    <Container>
      <Background />
      <SafeAreaView>
        <Header
          onPress={handleHeaderClick}
          label={headerLabel}
          testID="HeaderButton"
        />
        <NaviList>
          <ParlamentsNavi {...props} />
          <DrawerItemList {...props} />
          <DrawerItem
            label="⭐️  App Bewerten"
            onPress={() => rateApp()}
            labelStyle={{ fontSize: 16, color: "#ddd" }}
          />
          {devMode && (
            <DrawerItem
              label="🛠  Dev-Modus"
              onPress={() => router.push("/DevScreen")}
              labelStyle={{ fontSize: 16, color: "#ddd" }}
            />
          )}
        </NaviList>
      </SafeAreaView>
      {donationStatus && donationStatus.result && (
        <DonateBoxWrapper>
          <DonationTouch onPress={() => router.push("/Donate")}>
            <DonatedBox
              style={{ backgroundColor: "#4494d390" }}
              descriptionTextStyle={{ color: "#fff" }}
              moneyTextStyle={{ color: "#fff" }}
              target={donationStatus.result.donation_value_goal}
              occupied={donationStatus.result.donation_value}
            />
          </DonationTouch>
        </DonateBoxWrapper>
      )}
    </Container>
  );
};
