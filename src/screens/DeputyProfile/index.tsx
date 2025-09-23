import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import ContactBox from "./components/ContactBox";
// Components
import Chart from "./Chart";
// GraphQL
import { useNavigation } from "@react-navigation/core";
import { Avatar, ProcedureListItem } from "@democracy-deutschland/ui";
import { MatchesBar } from "./components/MatchBar";
import { getMatchingProcedures } from "./components/MatchBar/MatchesBar.utils";
import * as S from "./Foldable.styled";
import { RootStackParamList } from "../../app/_layout";
import styled from "styled-components/native";
import { useLocalVotes } from "../../api/state/localVotesStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import WomHeader from "../WahlOMeter/Header";
import ChartLegend from "../Procedure/components/Charts/ChartLegend";
import Folding from "../../components/Folding";
import { theme } from "../../styles/theme";
import {
  useGetDeputyProceduresQuery,
  useGetDeputyQuery,
  VoteSelection,
} from "../../__generated__/graphql";
import { PartyProps } from "@democracy-deutschland/ui/dist/Atoms/PartyLogo/old";
import { useRouter } from "expo-router";

const MemberImageWrapper = styled.View`
  width: 100%;
  /* height: 379px; */
  align-items: center;
  padding-bottom: 8px;
  padding-left: 60px;
`;

const Text = styled.Text`
  font-size: 15px;
`;

const TextGrey = styled(Text)`
  color: #6d6d72;
`;

const TextLighGrey = styled(Text)`
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const SegmentWrapper = styled.View`
  width: 100%;
`;

export interface Contacts {
  name: string;
  URL: string;
  username?: string;
}

type Props = RootStackParamList["DeputyProfile/[id]"];

export const DeputyProfilScreen: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [showProcedures, setShowProcedures] = useState(true);
  const localVotes = useLocalVotes();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, previousData } = useGetDeputyQuery({
    variables: {
      id: id,
      votedProcedureIds: localVotes.map(({ procedureId }) => procedureId),
    },
  });
  const {
    data: proceduresData,
    loading: proceduresLoading,
    fetchMore,
  } = useGetDeputyProceduresQuery({
    variables: {
      id: id,
      limit: 10,
      offset: 0,
    },
  });

  useEffect(() => {
    if (data?.deputy) {
      navigation.setOptions({ title: data.deputy.name });
    }
  }, [data, navigation]);

  const getActivityIndicator = () => <ActivityIndicator size="large" />;

  const getVotingData = (procedureCountByDecision: {
    YES: number;
    ABSTINATION: number;
    NO: number;
    NOTVOTED: number;
  }) => {
    return [
      {
        label: "Zustimmungen",
        color: "#99C93E",
        value: procedureCountByDecision.YES,
      },
      {
        label: "Enthaltungen",
        color: "#4CB0D8",
        value: procedureCountByDecision.ABSTINATION,
      },
      {
        label: "Ablehnungen",
        color: "#D43194",
        value: procedureCountByDecision.NO,
      },
      {
        label: "Abwesend",
        color: "#B1B3B4",
        value: procedureCountByDecision.NOTVOTED,
      },
    ];
  };

  const getProcedureCountByDecision = (
    procedures: {
      __typename?: "DeputyProcedure" | undefined;
      decision: VoteSelection;
      procedure: {
        __typename?: "Procedure" | undefined;
        procedureId: string;
      };
    }[]
  ) => {
    return procedures.reduce<{
      YES: number;
      ABSTINATION: number;
      NO: number;
      NOTVOTED: number;
    }>(
      (
        prev,
        { decision }: { decision: "YES" | "ABSTINATION" | "NO" | "NOTVOTED" }
      ) => {
        return { ...prev, [decision]: prev[decision] + 1 };
      },
      {
        YES: 0,
        ABSTINATION: 0,
        NO: 0,
        NOTVOTED: 0,
      }
    );
  };

  const deputyData = data?.deputy || previousData?.deputy;

  if (!deputyData) {
    return getActivityIndicator();
  }

  const {
    imgURL,
    party,
    name,
    job,
    biography,
    contact,
    procedures,
    totalProcedures,
    constituency,
  } = deputyData;

  let contacts: Contacts[] = [];
  if (contact) {
    contacts = contact.email
      ? [
          { name: "email", URL: contact.email },
          ...contact.links.map((link) => ({
            ...link,
            username: link.username ? link.username : undefined,
          })),
        ]
      : [
          ...contact.links.map((link) => ({
            ...link,
            username: link.username ? link.username : undefined,
          })),
        ];
  }

  const procedureCountByDecision = getProcedureCountByDecision(procedures);

  const votedProceduresCount =
    procedures.length - procedureCountByDecision.NOTVOTED;

  const votedProcedures = deputyData.matchesBar.map(
    ({ procedure, decision }) => ({
      procedureId: procedure.procedureId,
      decision,
    })
  );

  const chartData = {
    localVotes,
    votedProcedures,
  };

  const matchingProcedures = getMatchingProcedures(chartData);

  type FlatListData = Exclude<
    Exclude<typeof proceduresData, undefined>["deputy"],
    null | undefined
  >["procedures"][0];

  return (
    <FlatList<FlatListData>
      style={{ backgroundColor: "white" }}
      onEndReached={() => {
        !proceduresLoading &&
          showProcedures &&
          fetchMore({
            variables: { offset: proceduresData?.deputy?.procedures.length },
          });
      }}
      ListHeaderComponent={() => (
        <View style={{ alignItems: "center", paddingTop: 11 }}>
          <WomHeader
            totalProcedures={totalProcedures ?? 0}
            votedProceduresCount={matchingProcedures.length}
          />
          <MemberImageWrapper>
            <Avatar
              partyLogo={{
                party: party as PartyProps["party"],
                width: 200,
              }}
              profileImage={{
                height: 280,
                variant: "oval",
                source: { uri: imgURL },
              }}
            />
          </MemberImageWrapper>
          <Text>{name}</Text>
          {constituency ? (
            <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
          ) : null}
          <TextGrey>{job}</TextGrey>
          <Chart
            totalProcedures={totalProcedures || 0}
            votedProceduresCount={votedProceduresCount}
          />
          <ChartLegend data={getVotingData(procedureCountByDecision)} />
          {deputyData ? <MatchesBar decisions={deputyData.matchesBar} /> : null}
          <S.Wrapper>
            <S.Header onPress={() => setShowProcedures(!showProcedures)}>
              <S.Headline>Abstimmungen</S.Headline>
              <S.CollapseIcon open={showProcedures} />
            </S.Header>
            <S.Divider />
          </S.Wrapper>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          {biography || contact ? (
            <SegmentWrapper>
              {biography ? (
                <Folding title="Biographie">
                  <TextGrey>{biography}</TextGrey>
                </Folding>
              ) : null}
              {contact || contacts.length !== 0 ? (
                <Folding title="Kontakt" opened>
                  {contact ? <TextGrey>{contact.address}</TextGrey> : null}
                  {contacts.length !== 0 && <ContactBox contacts={contacts} />}
                </Folding>
              ) : null}
            </SegmentWrapper>
          ) : null}
        </>
      )}
      data={proceduresData?.deputy?.procedures ?? []}
      keyExtractor={(item) => item.procedure.procedureId}
      renderItem={({ item }) => {
        if (!showProcedures) {
          return null;
        }
        const localProcedure = localVotes.find(
          ({ procedureId }) => item.procedure.procedureId === procedureId
        );
        const decision = localProcedure?.selection;
        return (
          <TouchableOpacity
            onPress={() =>
              router.push(`/procedure/${item.procedure.procedureId}`)
            }
          >
            <ProcedureListItem
              // TODO: Fix new Date() in ProcedureListItem
              date={
                item.procedure.voteDate
                  ? new Date(item.procedure.voteDate)
                  : new Date()
              }
              title={item.procedure.title}
              subtitle={item.procedure.subjectGroups.join(", ")}
              voted={item.procedure.voted}
              votes={item.procedure.activityIndex.activityIndex}
              governmentChart={{
                data: [
                  {
                    color:
                      item.decision === "YES"
                        ? theme.colors.vote.government.yes
                        : item.decision === "ABSTINATION"
                        ? theme.colors.vote.government.abstination
                        : item.decision === "NO"
                        ? theme.colors.vote.government.no
                        : theme.colors.vote.government.notVoted,
                    highlight: true,
                    name: item.decision,
                    value: 1,
                  },
                ],
                size: 18,
              }}
              communityChart={
                decision
                  ? {
                      data: [
                        {
                          color:
                            decision === "YES"
                              ? theme.colors.vote.community.yes
                              : decision === "ABSTINATION"
                              ? theme.colors.vote.community.abstination
                              : theme.colors.vote.community.no,
                          highlight: true,
                          name: "yes",
                          value: 1,
                        },
                      ],
                      size: 18,
                    }
                  : undefined
              }
            />
            <S.Divider />
          </TouchableOpacity>
        );
      }}
    />
  );
};
