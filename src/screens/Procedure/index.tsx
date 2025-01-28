import React, { FC, useMemo } from "react";
import { RouteProp, useRoute } from "@react-navigation/core";
import { Intro } from "./components/Intro";
import Details from "./components/Details";
import Documents from "./components/Documents";
import { History } from "./components/History";
import { CommunityVoteResults } from "./components/CommunityVoteResults";
import { GovernmentVoteResults } from "./components/GovernmentVoteResults";
import PrepareActions from "./PrepareActions";
import { RootStackParamList } from "../../app/_layout";
import { CountryMap } from "./components/CountryMap";
import { DeputyVoteResultSlider } from "./components/DeputyVoteResults";
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useInitialState } from "../../api/state/initialState";
import { useRecoilValue } from "recoil";
import { constituencyState } from "../../api/state/constituency";
import { useProcedureQuery } from "../../__generated__/graphql";
import { ListLoading } from "../../components/ListLoading";
import Folding from "../../components/Folding";
import { useNavigation } from "expo-router";
import { useShare } from "./hooks/useShare";
import { useSetHeaderIcons } from "./hooks/useSetHeaderIcons";
import { useSetHeaderTitle } from "./hooks/useSetHeaderTitle";
import { ErrorComponent } from "./components/ErrorComponent";

const Container = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: #fff;
`;

const DetailsContainer = styled.View`
  padding-horizontal: 8px;
  margin-top: 18px;
  padding-vertical: 11px;
  border-top-width: 1px;
  border-color: rgba(68, 148, 211, 0.1);
`;

type RouteProps = RouteProp<RootStackParamList, "NotificationInstruction">;
type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "NotificationInstruction"
>;

type Props = {
  procedureId: string;
};

export const ProcedureScreen: FC<Props> = ({ procedureId }) => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { isVerified } = useInitialState();
  const constituency = useRecoilValue(constituencyState);
  const constituencies = useMemo(
    () => (constituency ? [constituency] : []),
    [constituency]
  );
  const { data, loading, error, refetch } = useProcedureQuery({
    variables: {
      id: procedureId,
      constituencies,
    },
  });
  const share = useShare();

  useSetHeaderIcons({
    navigation,
    data,
    procedureId,
  });

  useSetHeaderTitle({
    navigation,
    route,
    data,
  });

  if (loading) {
    return <ListLoading />;
  }
  if (error || !data) {
    return (
      <ErrorComponent
        onRetry={() => refetch({ id: procedureId, constituencies })}
      />
    );
  }

  const {
    title,
    voteDate,
    voteEnd,
    type,
    subjectGroups,
    submissionDate,
    abstract,
    currentStatus,
    importantDocuments,
    currentStatusHistory,
    communityVotes,
    voteResults,
    voted,
    notify,
  } = data.procedure;

  return (
    <Container testID="ProcedureScrollView">
      <Intro
        {...data.procedure}
        voteDate={
          data.procedure.voteDate
            ? new Date(data.procedure.voteDate)
            : undefined
        }
        voteEnd={
          data.procedure.voteEnd ? new Date(data.procedure.voteEnd) : undefined
        }
        sessionTOPHeading={data.procedure.sessionTOPHeading ?? undefined}
        votedGovernment={data.procedure.votedGovernment ?? false}
      />
      <DetailsContainer>
        <Details
          subjectGroups={subjectGroups}
          submissionDate={String(submissionDate)}
          dateVote={voteDate ?? undefined}
          abstract={abstract || null}
          procedureId={procedureId}
          currentStatus={currentStatus || null}
          type={type}
        />
      </DetailsContainer>
      <Folding title="Dokumente">
        <Documents documents={importantDocuments} />
      </Folding>
      {currentStatusHistory.length > 0 && (
        <Folding title="Gesetzesstand">
          <History
            history={currentStatusHistory}
            currentStatus={currentStatus}
          />
        </Folding>
      )}

      {communityVotes &&
        ((voteEnd && new Date(voteEnd) < new Date()) || voted) && (
          <CommunityVoteResults
            countryMap={<CountryMap key="countryMap" {...{ procedureId }} />}
            voteResults={communityVotes}
            voted={voted}
          />
        )}
      {voteResults && (
        <GovernmentVoteResults
          key="government"
          voteResults={voteResults}
          currentStatus={currentStatus}
          voted={voted}
        />
      )}
      {voteResults?.namedVote && currentStatus !== "Zurückgezogen" && (
        <DeputyVoteResultSlider
          key="deputies"
          voteResults={voteResults}
          voted={voted}
          procedureId={procedureId}
        />
      )}
      <PrepareActions
        verified={isVerified}
        type={type}
        voted={voted}
        share={() => share({ type, procedureId, title })}
        notify={!!notify}
        procedureId={procedureId}
        title={title}
      />
    </Container>
  );
};
