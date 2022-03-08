import { lightTheme } from '@democracy-deutschland/ui';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { DefaultTheme, Theme } from '@react-navigation/native';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightTheme.colors.background.primary,
  },
};
