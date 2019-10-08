import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';
import { RootStackParamList } from '..';

export const rootNavigationRef = React.createRef<NavigationContainerRef>();

export const rootNavigate = (name: keyof RootStackParamList, params?: any) => {
  rootNavigationRef.current && rootNavigationRef.current.navigate(name, params);
};
