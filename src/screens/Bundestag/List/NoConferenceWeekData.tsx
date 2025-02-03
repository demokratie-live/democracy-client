import React, { useContext } from "react";
import styled from "styled-components/native";
import { Button } from "react-native";
import dateFormat from "dateformat";
import { useCurrentConferenceWeekQuery } from "../../../__generated__/graphql";
import { NotificationsContext } from "../../../api/state/notificationPermission";
import SvgConferenceWeekPlaceholder from "../../../components/Icons/ConferenceWeekPlaceholder";
import { Space } from "../../../components/Space";
import { router } from "expo-router";

const Container = styled.ScrollView.attrs({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
})``;

const Text = styled.Text`
  font-size: 15px;
  text-align: center;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 11px;
`;

const TextGrey = styled(Text)`
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const IconWrapper = styled.View`
  align-items: center;
`;

export const NoConferenceWeekData = () => {
  const { data } = useCurrentConferenceWeekQuery();
  const { notificationSettings } = useContext(NotificationsContext);
  return (
    <Container testID={"NoConferenceWeekData"}>
      <IconWrapper>
        <SvgConferenceWeekPlaceholder width={150} height={150} color="#000" />
      </IconWrapper>
      <Space space={18} />
      <Text>
        Es liegen derzeit <Bold>{"noch keine\nAbstimmungsdaten"}</Bold> vor.
      </Text>
      {!!data && (
        <TextGrey>
          {`Die nächste Sitzungswoche findet gemäß Sitzungswochenkalender in KW ${data.currentConferenceWeek.calendarWeek}
(`}
          {dateFormat(data.currentConferenceWeek?.start, "dd.mm.yyyy")} –{" "}
          {dateFormat(data.currentConferenceWeek?.end, "dd.mm.yyyy")}
          {`)
statt.`}
        </TextGrey>
      )}

      {(!notificationSettings.enabled ||
        !notificationSettings.conferenceWeekPushs) && (
        <Button
          title="Benachrichtigen"
          onPress={() => router.push("/Settings")}
        />
      )}
    </Container>
  );
};
