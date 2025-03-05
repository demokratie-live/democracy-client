import { ParlamentIdentifier, parlaments } from "src/api/state/parlament";
import * as S from "./Parlaments.styled";
import { CollapseIcon } from "src/screens/DeputyProfile/Foldable.styled";
import { router } from "expo-router";
import { DrawerItem } from "@react-navigation/drawer";
import SvgGovernment from "src/components/Icons/Government";
import SvgWahlOMeter from "src/components/Icons/WahlOMeter";
import { AvatarIcon } from "@democracy-deutschland/ui";
import { useState } from "react";
import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";

interface ParlamentProps {
  parlamentKey: string;
  parlaments: typeof parlaments;
  currentTap?: string;
}

export const ParlamentDrawerItem: React.FC<ParlamentProps> = ({
  parlamentKey,
  parlaments,
  currentTap,
}) => {
  const { legislaturePeriod, setLegislaturePeriod } =
    useLegislaturePeriodStore();
  const [isOpen, setIsOpen] = useState(
    parlamentKey === `BT-${legislaturePeriod}`
  );

  const parl = parlaments[parlamentKey as ParlamentIdentifier];

  const handleClick =
    (
      route: {
        name: string;
        key?: string;
        params?: object;
      },
      { parlamentIdentifier }: { parlamentIdentifier: ParlamentIdentifier }
    ) =>
    () => {
      setLegislaturePeriod(String(parl.period));
      switch (route.name) {
        case "Procedures":
          console.log(
            "router.push",
            `/(sidebar)/${parl.period}/${route.name}/${parl.mainScreen}`
          );
          router.push(
            `/(sidebar)/${parl.period}/${route.name}/${parl.mainScreen}`
          );
          break;
        case "WahlOMeter":
        case "Deputies":
          console.log("router.push", `/(sidebar)/${parl.period}/${route.name}`);
          router.push(`/(sidebar)/${parl.period}/${route.name}`);
          break;
      }
    };

  const drawerItemProps = {
    activeTintColor: "#fff",
    inactiveTintColor: "#fff",
    activeBackgroundColor: "rgba(68, 148, 211, 0.5)",
    labelStyle: {
      color: "#fff",
    },
    style: {
      borderRadius: 0,
      marginTop: 4,
    },
  };

  const isFocused = (
    name: string,
    { parlamentIdentifier }: { parlamentIdentifier: ParlamentIdentifier }
  ) => {
    const focusedName = currentTap;
    return (
      name === focusedName && parlamentIdentifier === `BT-${legislaturePeriod}`
    );
  };

  return (
    <S.List key={parl.identifier}>
      <S.HeadlineWrapper onPress={() => setIsOpen(!isOpen)}>
        <S.Headline>{`${parl.institution} LP ${parl.period}`}</S.Headline>
        <CollapseIcon
          open={isOpen}
          color="rgb(255, 255, 255)"
          width={16}
          height={16}
        />
      </S.HeadlineWrapper>
      {isOpen && (
        <>
          <DrawerItem
            label="Vorgänge"
            icon={({ color, size }) => (
              <SvgGovernment width={size} height={size} color={color} />
            )}
            onPress={handleClick(
              { name: "Procedures" },
              { parlamentIdentifier: parl.identifier }
            )}
            focused={isFocused("Procedures", {
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
              { name: "WahlOMeter" },
              { parlamentIdentifier: parl.identifier }
            )}
            focused={isFocused("WahlOMeter", {
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
              { name: "Deputies" },
              { parlamentIdentifier: parl.identifier }
            )}
            focused={isFocused("Deputies", {
              parlamentIdentifier: parl.identifier,
            })}
            {...drawerItemProps}
          />
        </>
      )}
    </S.List>
  );
};
