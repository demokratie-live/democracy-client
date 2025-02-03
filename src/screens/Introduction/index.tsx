import React, { FC, useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getVersion } from "react-native-device-info";
// import { NotificationsContext } from '../../../context/NotificationPermission';
import { getSlides } from "./utils/getSlides";
// import { PushInstructions } from './PushInstructions';
import { RootStackParamList } from "../../app/_layout";
import { useRecoilValue } from "recoil";
import { initialState } from "../../api/state/initialState";
import { Pager } from "./components/Pager";
import { Slide, slidesData } from "./components";
import { PushInstructions } from "./PushInstructions";
import { NotificationsContext } from "../../api/state/notificationPermission";
import { useNotificationPermission } from "./useNotificationPermission";
import { router } from "expo-router";

/**
 * TODO: Reenable NotificationContext
 */

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const IntroductionScreen: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isVerified, setLastStartWithVersion } = useRecoilValue(initialState);
  const { notificationSettings } = useContext(NotificationsContext);
  const authorized = useNotificationPermission();
  let {
    lastStartWithVersion,
    done,
  }: { lastStartWithVersion: string; done?: string } = {
    lastStartWithVersion: "",
    done: undefined,
  };

  const finishAction = () => {
    if (done === "SET_LAST_START_VERSION") {
      setLastStartWithVersion(getVersion());
    }
    navigation.goBack();
  };

  const slides = getSlides({
    lastVersion: lastStartWithVersion,
    registered: isVerified,
  });

  const slideScreens = slides.map((slide, i) => (
    <Slide
      key={slide.head.title}
      head={slide.head}
      images={slide.images}
      isNew={slide.isNew}
      nextSlide={
        // TODO fix android next button click. does not work correctly
        i + 1 === Object.keys(slidesData).length ? finishAction : undefined
      }
    />
  ));

  if (
    !notificationSettings.outcomePushs ||
    !notificationSettings.enabled ||
    !authorized
  ) {
    slideScreens.push(<PushInstructions key="push-instructions" />);
  }

  return (
    <SafeAreaView testID="Introduction">
      <Pager
        nextButton
        nextText="Verstanden"
        finishText="Später"
        finishAction={() => {
          setLastStartWithVersion(getVersion());
          router.back();
        }}
      >
        {slideScreens}
      </Pager>
    </SafeAreaView>
  );
};
