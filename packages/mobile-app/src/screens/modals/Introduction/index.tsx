import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../../routes';

import { Slide } from '@democracy-deutschland/mobile-ui/src/components/Instruction';
import {
  slidesData,
  Screen,
} from '@democracy-deutschland/mobile-ui/src/components/Instruction/data';
import { Pager } from '@democracy-deutschland/mobile-ui/src/components/Pager';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Introduction = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const finishAction = navigation.goBack;

  return (
    <SafeAreaView testID="Instructions">
      <Pager
        testID="pager"
        nextButton
        nextText="Weiter"
        finishText="Los geht's"
        finishAction={finishAction}>
        {Object.keys(slidesData).map((screen, i) => (
          <Slide
            key={screen}
            head={slidesData[screen as Screen].head}
            images={slidesData[screen as Screen].images}
            isNew={slidesData[screen as Screen].isNew}
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
