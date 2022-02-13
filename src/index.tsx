import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {PlaceholderScreen} from './screens/Placeholder';
import {ThemeProvider} from './styles/styled-components';
import {theme} from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <PlaceholderScreen title="Placeholder" />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
