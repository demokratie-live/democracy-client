import { DefaultTheme as UiTheme, lightTheme } from '@democracy-deutschland/ui';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { DefaultTheme, Theme } from '@react-navigation/native';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: lightTheme.colors.background.primary,
  },
};

export const tabNavigationScreenOptions = (theme: UiTheme): MaterialTopTabNavigationOptions => ({
  tabBarScrollEnabled: false,
  tabBarIndicatorStyle: {
    backgroundColor: theme.colors.text.secondary,
  },
  tabBarActiveTintColor: theme.colors.text.secondary,
  tabBarInactiveTintColor: theme.colors.text.secondary,
  tabBarStyle: {
    backgroundColor: theme.colors.primary,
  },
});
