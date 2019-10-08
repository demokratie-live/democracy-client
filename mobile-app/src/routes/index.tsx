import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React from 'react';
import { Text } from 'react-native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';
import HomeScreen from '../screens/Home';
import {Screen, slidesData} from "@democracy-deutschland/ui-mobile/src/components/Instruction/data";
import Slide from '@democracy-deutschland/ui-mobile/src/components/Instruction/Slide';


const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function DetailsScreen() {
  return (
    <Slide
        head={slidesData[Screen.Analysiere].head}
        images={slidesData[Screen.Analysiere].images}
        nextPage={() => {}}
        isNew={slidesData[Screen.Analysiere].isNew}
      />
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Overview 🙈' }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}

export default App;
