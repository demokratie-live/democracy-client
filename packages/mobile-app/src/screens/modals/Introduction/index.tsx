import React, { FC } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../../routes';

import { Slide } from '@democracy-deutschland/mobile-ui/src/components/Instruction';
import { slidesData } from '@democracy-deutschland/mobile-ui/src/components/Instruction/data';
import { Pager } from '@democracy-deutschland/mobile-ui/src/components/Pager';
import { getSlides } from './utils/getSlides';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

type InstructionScreenRouteProp = RouteProp<RootStackParamList, 'Introduction'>;

type Props = {
  route: InstructionScreenRouteProp;
};

const Introduction: FC<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const finishAction = () => {
    if (route.params && route.params.done) {
      route.params.done();
    }
    navigation.goBack();
  };

  const slides = getSlides({
    // TODO route.params could be undefined. check update the library or create an issue
    lastVersion: route.params ? route.params.lastStartWithVersion : undefined,
    registered: false,
  });

  return (
    <SafeAreaView testID="Instructions">
      <Pager
        nextButton
        nextText="Weiter"
        finishText="Los geht's"
        finishAction={finishAction}>
        {slides.map((slide, i) => (
          <Slide
            key={slide.head.title}
            head={slide.head}
            images={slide.images}
            isNew={slide.isNew}
            nextSlide={
              i + 1 === Object.keys(slidesData).length
                ? finishAction
                : undefined
            }
          />
        ))}
      </Pager>
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView>
  //     <Text>Introduction Screen</Text>
  //     <Button onPress={() => navigation.goBack()} title="Dismiss" />
  //   </SafeAreaView>
  // );
};

export default Introduction;
