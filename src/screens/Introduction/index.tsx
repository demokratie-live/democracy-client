import React, { FC } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/core';
import styled from 'styled-components/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getVersion } from 'react-native-device-info';
// import { NotificationsContext } from '../../../context/NotificationPermission';
import { getSlides } from './utils/getSlides';
// import { PushInstructions } from './PushInstructions';
import { RootStackParamList } from '../../routes';
import { useRecoilValue } from 'recoil';
import { initialState } from '../../api/state/initialState';
import { Pager } from './components/Pager';
import { Slide, slidesData } from './components';

/**
 * TODO: Reenable NotificationContext
 */

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

type IntroductionScreenRouteProp = RouteProp<RootStackParamList, 'Introduction'>;

type Props = {
  route: IntroductionScreenRouteProp;
};

const Introduction: FC<Props> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isVerified, setLastStartWithVersion } = useRecoilValue(initialState);
  // const { notificationSettings, hasPermissions } = useContext(NotificationsContext);
  let { lastStartWithVersion, done } = {
    lastStartWithVersion: '',
    done: undefined,
  } as IntroductionScreenRouteProp['params'];
  if (route && route.params) {
    lastStartWithVersion = route.params.lastStartWithVersion || '';
    done = route.params.done;
  }

  const finishAction = () => {
    if (done === 'SET_LAST_START_VERSION') {
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

  // if (!notificationSettings.outcomePushs || !notificationSettings.enabled || !hasPermissions) {
  //   slideScreens.push(<PushInstructions key="push-instructions" finishAction={finishAction} />);
  // }

  // if (slideScreens.length === 0) {
  //   setLastStartWithVersion(getVersion());
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Sidebar' }],
  //   });
  // }

  return (
    <SafeAreaView testID="Introduction">
      <Pager nextButton nextText="Verstanden" finishText="Später" finishAction={finishAction}>
        {slideScreens}
      </Pager>
    </SafeAreaView>
  );
};

export default Introduction;
