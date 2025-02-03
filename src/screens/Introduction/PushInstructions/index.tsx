import React, { useContext, useState } from "react";
import { NotificationBox } from "./NotificationBox";
import { defaultNotificationData } from "./data";
import { Dimensions, Switch, View } from "react-native";
import styled from "styled-components/native";
import { NotificationsContext } from "../../../api/state/notificationPermission";
import { Button } from "@democracy-deutschland/ui";
import { Headline } from "../../../components/Headline";
import { AppLogo } from "../../../components/AppLogo";
import { router } from "expo-router";

const DEVICE_WIDTH = Dimensions.get("window").width;

const Wrapper = styled.View`
  width: ${DEVICE_WIDTH}px;
  align-items: center;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "space-around",
    flexGrow: 1,
    marginBottom: 40,
  },
})``;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 15px;
  margin-top: 18px;
  margin-bottom: 18px;
  margin-horizontal: 18px;
  text-align: center;
`;

const SwitchWrapper = styled.View`
  width: ${DEVICE_WIDTH}px;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 18px;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const SwitchText = styled.Text`
  font-size: 17px;
  flex: 1;
  padding-right: 18px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const Highlight = styled.Text`
  color: #000;
`;

const ActivateButton = styled(Button)`
  margin-horizontal: ${({ theme }) => theme.spaces.default};
`;

export interface Notification {
  title: string;
  text: string;
  description: string;
}

interface Props {
  alreadyKnown?: boolean;
}

export const PushInstructions: React.FC<Props> = ({ alreadyKnown = false }) => {
  const [pushActive, setPushActive] = useState(true);
  const { update: updateNotificationSettings } =
    useContext(NotificationsContext);

  const notification = {
    title: defaultNotificationData.outcomePushs.title,
    text: defaultNotificationData.outcomePushs.text,
    description: defaultNotificationData.outcomePushs.description,
  };

  const pressActivate = async () => {
    await Notification.requestPermission();
    updateNotificationSettings({
      enabled: true,
      outcomePushs: true,
    });
    router.back();
  };

  return (
    <Wrapper>
      <ScrollView>
        {!alreadyKnown && (
          <>
            <AppLogo />
            <Headline>Ergebnisse erhalten</Headline>
            <Subtitle>
              Werde nach Deiner Abstimmung automatisch über das offizielle
              Ergebnis des Bundestages informiert, sobald dieses vorliegt, um es
              mit Deinem vergleichen zu können.
            </Subtitle>
          </>
        )}
        <View>
          <NotificationBox
            icon={require("../components/assets/icon.logo.png")}
            owner="DEMOCRACY"
            title={notification.title}
            text={notification.text}
          />
        </View>
        {!!alreadyKnown && (
          <Subtitle>
            Ab sofort informiert DEMOCRACY Dich <Highlight>per Push</Highlight>{" "}
            über das offizielle <Highlight>Ergebnis des Bundestages</Highlight>{" "}
            zu Deiner Abstimmung, sobald dieses vorliegt, um es mit Deinem
            vergleichen zu können.
          </Subtitle>
        )}
        <SwitchWrapper>
          <SwitchText>
            Bundestagsergebnisse immer automatisch erhalten
          </SwitchText>
          <Switch value={pushActive} onValueChange={setPushActive} />
        </SwitchWrapper>
        <ActivateButton
          variant="primary"
          onPress={() => {
            pressActivate();
          }}
          disabled={!pushActive}
        >
          Aktivieren
        </ActivateButton>
      </ScrollView>
    </Wrapper>
  );
};
