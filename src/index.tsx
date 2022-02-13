import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Routes} from './routes';
import {ThemeProvider} from './styles/styled-components';
import {theme} from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
