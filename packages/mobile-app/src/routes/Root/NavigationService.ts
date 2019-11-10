import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';
import { RootStackParamList } from '..';

export const rootNavigationRef = React.createRef<NavigationContainerRef>();

export const rootNavigate = <T extends keyof RootStackParamList>(
  name: T,
  params: RootStackParamList[T] = {},
) => {
  rootNavigationRef.current && rootNavigationRef.current.navigate(name, params);
};
