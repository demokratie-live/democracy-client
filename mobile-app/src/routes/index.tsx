import React from 'react';
import { Text } from 'react-native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styled from 'styled-components/native';
import HomeScreen from '../screens/Home';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function DetailsScreen() {
  return (
    <Container>
      <Text>Details Screen</Text>
    </Container>
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
