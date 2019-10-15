import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes';

import { Slide } from '@democracy-deutschland/mobile-ui/src/components/Instruction';
import { slidesData } from '@democracy-deutschland/mobile-ui/src/components/Instruction/data';
import { Pager } from '@democracy-deutschland/mobile-ui/src/components/Pager';

const Introduction = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pager testID="welcome">
      {Object.keys(slidesData).map((screen, i) => (
        <Slide
          head={slidesData[screen].head}
          images={slidesData[screen].images}
          isNew={slidesData[screen].isNew}
          nextSlide={
            i + 1 === Object.keys(slidesData).length
              ? () => {
                  console.log('HIER');
                  navigation.goBack();
                }
              : undefined
          }
        />
      ))}
    </Pager>
  );

  // return (
  //   <SafeAreaView>
  //     <Text>Introduction Screen</Text>
  //     <Button onPress={() => navigation.goBack()} title="Dismiss" />
  //   </SafeAreaView>
  // );
};

export default Introduction;
