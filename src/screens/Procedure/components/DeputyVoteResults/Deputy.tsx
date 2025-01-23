import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Avatar } from "@democracy-deutschland/ui";
import { RootStackParamList } from "../../../../app/_layout";
import styled from "styled-components/native";
import SvgInfo from "../../../../components/Icons/Info";
import { DeputyVoteResultsQuery } from "../../../../__generated__/graphql";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PartyProps } from "@democracy-deutschland/ui/dist/Atoms/PartyLogo/old";
import { useWindowDimensions } from "react-native";

const Wrapper = styled.View<{ width: number }>`
  align-items: center;
`;

const InfoIconButton = styled.TouchableOpacity``;

const InfoIcon = styled(SvgInfo).attrs(() => ({
  width: 18,
  height: 18,
  color: "rgb(199, 199, 204)",
}))`
  margin-left: ${({ theme }) => theme.spaces.small};
`;

const DeputyDetailsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 20px;
`;

const NameWrapper = styled.View`
  align-items: center;
`;

const MemberImageWrapper = styled.TouchableOpacity`
  width: 200px;
  height: 275px;
  align-items: center;
  padding-bottom: 8px;
  padding-left: 80px;
`;

const Text = styled.Text`
  font-size: 15px;
`;

const TextLighGrey = styled(Text)`
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const Decision = styled.Text<{ decision: string | null }>`
  font-size: 21px;
  padding-top: 14px;
  padding-bottom: 3px;
  color: ${({ decision }) => {
    switch (decision) {
      case "YES":
        return "#99c93e";
      case "ABSTINATION":
        return "#4CB0D8";
      case "NO":
        return "#D43194";

      default:
        return "#B1B3B4";
    }
  }};
`;

const getDecisionString = (decision: string | null) => {
  switch (decision) {
    case "YES":
      return "Zugestimmt";
    case "ABSTINATION":
      return "Enthalten";
    case "NO":
      return "Abgelehnt";

    default:
      return "Nicht Abgestimmt";
  }
};

type Props = Exclude<
  DeputyVoteResultsQuery["procedure"]["voteResults"],
  null | undefined
>["deputyVotes"][0];

export const DeputyVoteResult: React.FC<Props> = ({
  decision,
  deputy: { constituency, name, party, webId, imgURL },
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();

  return (
    <Wrapper width={width} key={webId}>
      <MemberImageWrapper
        onPress={() => {
          navigation.push("DeputyProfile/[id]", { id: webId });
        }}
      >
        {party ? (
          <Avatar
            partyLogo={{
              party: party as PartyProps["party"],
              width: 180,
            }}
            profileImage={{
              height: 268,
              variant: "oval",
              source: { uri: imgURL },
            }}
          />
        ) : null}
      </MemberImageWrapper>
      <DeputyDetailsWrapper>
        <NameWrapper>
          <Text>{name}</Text>
          <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
        </NameWrapper>
        <InfoIconButton
          onPress={() => navigation.push("DeputyProfile/[id]", { id: webId })}
        >
          <InfoIcon />
        </InfoIconButton>
      </DeputyDetailsWrapper>
      <Decision decision={decision}>{getDecisionString(decision)}</Decision>
    </Wrapper>
  );
};
