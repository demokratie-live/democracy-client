import React from "react";
import * as S from "./Parlaments.styled";
import { SidebarProps } from "../Sidebar";
import { parlaments } from "../../../api/state/parlament";
import { ParlamentDrawerItem } from "./Parlament";
import { useSegments } from "expo-router";

export const ParlamentsNavi: React.FC<SidebarProps> = (props) => {
  const segments = useSegments();
  const currentTap = segments.at(-2);

  return (
    <S.Container>
      {Object.keys(parlaments).map((parlamentKey) => (
        <ParlamentDrawerItem
          key={parlamentKey}
          parlamentKey={parlamentKey}
          parlaments={parlaments}
          currentTap={currentTap}
        />
      ))}
    </S.Container>
  );
};
