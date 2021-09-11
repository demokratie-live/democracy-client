import React, { useContext } from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import * as S from './Parlaments.styled';
import GovernmentIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Government';
import { SidebarProps } from '../Sidebar';
import SvgWahlOMeter from '@democracy-deutschland/mobile-ui/src/components/Icons/WahlOMeter';
import { AvatarIcon } from '@democracy-deutschland/ui';
import { CommonActions, DrawerActions } from '@react-navigation/routers';
import {
  ParlamentContext,
  ParlamentIdentifier,
} from '../../../context/Parlament';

export interface ListsProps extends SidebarProps {
  list?: any;
}

export const Parlaments: React.FC<ListsProps> = ({
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  labelStyle,
  itemStyle,
  navigation,
  state,
}) => {
  const { parlaments, parlament, setParlament } = useContext(ParlamentContext);
  const drawerItemProps = {
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
    labelStyle,
    itemStyle,
  };

  const isFocused = (
    name: string,
    { parlamentIdentifier }: { parlamentIdentifier: ParlamentIdentifier },
  ) => {
    const focusedName = state.routes[state.index].name;
    return name === focusedName && parlamentIdentifier === parlament.identifier;
  };

  const handleClick = (
    route: {
      name: string;
      key?: string;
      params?: object;
    },
    { parlamentIdentifier }: { parlamentIdentifier: ParlamentIdentifier },
  ) => () => {
    navigation.dispatch({
      ...DrawerActions.closeDrawer(),
      target: state.key,
    });
    if (!isFocused(route.name, { parlamentIdentifier })) {
      setParlament(parlamentIdentifier);
      navigation.dispatch({
        ...CommonActions.navigate({
          ...route,
          params: { ...route.params, parlamentIdentifier },
        }),
        target: state.key,
      });
    }
  };

  return (
    <S.Container>
      {Object.keys(parlaments).map(parlamentKey => {
        const parl = parlaments[parlamentKey as ParlamentIdentifier];
        return (
          <S.List key={parl.identifier}>
            <S.Headline>{`${parl.institution} LP ${parl.period}`}</S.Headline>
            <DrawerItem
              label="Vorgänge"
              icon={({ color, size }) => (
                <GovernmentIcon width={size} height={size} color={color} />
              )}
              onPress={handleClick(
                { name: 'Bundestag' },
                { parlamentIdentifier: parl.identifier },
              )}
              focused={isFocused('Bundestag', {
                parlamentIdentifier: parl.identifier,
              })}
              {...drawerItemProps}
            />
            <DrawerItem
              label="Wahl-O-Meter"
              icon={({ color, size }) => (
                <SvgWahlOMeter width={size} height={size} color={color} />
              )}
              onPress={handleClick(
                { name: 'WahlOMeter' },
                { parlamentIdentifier: parl.identifier },
              )}
              focused={isFocused('WahlOMeter', {
                parlamentIdentifier: parl.identifier,
              })}
              {...drawerItemProps}
            />
            <DrawerItem
              label="Abgeordnete"
              icon={({ color, size }) => (
                <AvatarIcon width={size} height={size} fill={color} />
              )}
              onPress={handleClick(
                { name: 'Abgeordnete' },
                { parlamentIdentifier: parl.identifier },
              )}
              focused={isFocused('Abgeordnete', {
                parlamentIdentifier: parl.identifier,
              })}
              {...drawerItemProps}
            />
          </S.List>
        );
      })}
    </S.Container>
  );
};
