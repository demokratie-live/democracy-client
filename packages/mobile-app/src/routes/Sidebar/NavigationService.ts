import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/core';
import { SidebarParamList } from '.';
import { DrawerActions } from '@react-navigation/routers';

export const sidebarNavigationRef = React.createRef<NavigationContainerRef>();

export const sidebarNavigate = (name: keyof SidebarParamList, params?: any) => {
  sidebarNavigationRef.current &&
    sidebarNavigationRef.current.navigate(name, params);
};

export const sidebarToggle = () => {
  sidebarNavigationRef.current &&
    sidebarNavigationRef.current.dispatch(DrawerActions.toggleDrawer());
};
