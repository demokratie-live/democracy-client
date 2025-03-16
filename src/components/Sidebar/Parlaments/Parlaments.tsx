import React from "react";
import * as S from "./Parlaments.styled";
import { SidebarProps } from "../Sidebar";
import { parlaments } from "../../../api/state/parlament";
import { ParlamentDrawerItem } from "./Parlament";

export const ParlamentsNavi: React.FC<SidebarProps> = (props) => {
  return (
    <S.Container>
      {Object.keys(parlaments).map((parlamentKey) => (
        <ParlamentDrawerItem
          key={parlamentKey}
          parlamentKey={parlamentKey}
          parlaments={parlaments}
        />
      ))}
    </S.Container>
  );
};
