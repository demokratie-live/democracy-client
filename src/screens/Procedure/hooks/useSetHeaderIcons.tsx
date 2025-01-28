import { useEffect } from "react";
import { useShare } from "./useShare";
import { useToggleNotification } from "./useToggleNotification";
import { Platform } from "react-native";
import styled from "styled-components/native";
import SvgShareIosHeader from "../../../components/Icons/ShareIosHeader";
import SvgShare from "../../../components/Icons/Share";
import SvgBellHeader from "../../../components/Icons/BellHeader";
import SvgBellFilledHeader from "../../../components/Icons/BellFilledHeader";
import { MenuButton } from "../../../components/MenuButton";
import { ProcedureQuery } from "../../../__generated__/graphql";

const HaderRightWrapper = styled.View`
  flex-direction: row;
`;

const ShareComponent = Platform.OS === "ios" ? SvgShareIosHeader : SvgShare;

type UseSetHeaderIconsProps = {
  navigation: any;
  data: ProcedureQuery | undefined;
  procedureId: string;
};

export function useSetHeaderIcons({
  navigation,
  data,
  procedureId,
}: UseSetHeaderIconsProps) {
  const share = useShare();
  const clickBell = useToggleNotification({
    procedureId,
    data,
    navigation,
  });

  useEffect(() => {
    if (data?.procedure) {
      const { notify, type, procedureId, title } = data?.procedure;
      const BellIcon = !notify ? SvgBellHeader : SvgBellFilledHeader;
      navigation.setOptions({
        headerRight: () => (
          <HaderRightWrapper>
            <MenuButton onPress={clickBell}>
              <BellIcon width={20} height={20} color="#fff" />
            </MenuButton>
            <MenuButton onPress={() => share({ type, procedureId, title })}>
              <ShareComponent width={20} height={20} color="#fff" />
            </MenuButton>
          </HaderRightWrapper>
        ),
      });
    }
  }, [navigation, data, share, clickBell]);
}
