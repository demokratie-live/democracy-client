import React, { useState } from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import * as S from './Parlaments.styled';
import { SidebarProps } from '../Sidebar';
import { AvatarIcon } from '@democracy-deutschland/ui';
import { CommonActions, DrawerActions } from '@react-navigation/routers';
import {
  parlaments,
  ParlamentIdentifier,
  parlamentState,
  Parlament,
} from '../../../../api/state/parlament';
import { useRecoilState } from 'recoil';
import SvgGovernment from '../../../../components/Icons/Government';
import SvgWahlOMeter from '../../../../components/Icons/WahlOMeter';
import { CollapseIcon } from '../../../../screens/DeputyProfile/Foldable.styled';

export type ListsProps = SidebarProps;

const isCurrentLegislaturePeriod = (currentParlament: ParlamentIdentifier, parlament: Parlament) =>
  Number(currentParlament.substring(3)) === parlament.period;

const showLegislaturePeriod = (
  currentParlament: ParlamentIdentifier,
  parlament: Parlament,
  legislaturePeriodSelected: boolean,
) => isCurrentLegislaturePeriod(currentParlament, parlament) || legislaturePeriodSelected;

export const ParlamentsNavi: React.FC<ListsProps> = ({ navigation, state }) => {
  const [parlament, setParlament] = useRecoilState(parlamentState);
  const [legislaturePeriodSelected, setLegislaturePeriodSelected] = useState(false);
  const drawerItemProps = {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    activeBackgroundColor: 'rgba(68, 148, 211, 0.5)',
    labelStyle: {
      color: '#fff',
    },
  };

  const isFocused = (
    name: string,
    { parlamentIdentifier }: { parlamentIdentifier: ParlamentIdentifier },
  ) => {
    const focusedName = state.routes[state.index].name;
    return name === focusedName && parlamentIdentifier === parlament;
  };

  const handleClick =
    (
      route: {
        name: string;
        key?: string;
        params?: object;
      },
      { parlamentIdentifier }: { parlamentIdentifier: ParlamentIdentifier },
    ) =>
    () => {
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
            <S.HeadlineWrapper
              disabled={isCurrentLegislaturePeriod(parlament, parl)}
              onPress={() => setLegislaturePeriodSelected(v => !v)}
            >
              <S.Headline>{`${parl.institution} LP ${parl.period}`}</S.Headline>
              <CollapseIcon
                open={showLegislaturePeriod(parlament, parl, legislaturePeriodSelected)}
                color="#fff"
                width={16}
                height={16}
              />
            </S.HeadlineWrapper>
            {showLegislaturePeriod(parlament, parl, legislaturePeriodSelected) ? (
              <>
                {parl.screens.procedures ? (
                  <DrawerItem
                    label="Vorgänge"
                    icon={({ color, size }) => (
                      <SvgGovernment width={size} height={size} color={color} />
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
                ) : null}
                {parl.screens.wom ? (
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
                ) : null}
                {parl.screens.deputies ? (
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
                ) : null}
              </>
            ) : null}
          </S.List>
        );
      })}
    </S.Container>
  );
};
