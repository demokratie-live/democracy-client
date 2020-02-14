import React, { useContext, FC } from 'react';
import { Text, Platform, Share } from 'react-native';
import { RouteProp } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';

import { useQuery } from '@apollo/react-hooks';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import speakingurl from 'speakingurl';
import {
  Procedure as ProcedureQueryObj,
  ProcedureVariables,
} from './graphql/query/__generated__/Procedure';
import PROCEDURE from './graphql/query/Procedure';
import { Intro } from './components/Intro';
import styled from 'styled-components/native';
import Details from './components/Details';
import Documents from './components/Documents';
import { History } from './components/History';
import { CommunityVoteResults } from './components/CommunityVoteResults';
import { GovernmentVoteResults } from './components/GovernmentVoteResults';
import PrepareActions from './PrepareActions';
import { InitialStateContext } from '../../../context/InitialStates';
import { getShareLink } from '../../../lib/shareLink';
import { ConstituencyContext } from '../../../context/Constituency';

const Container = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: #fff;
`;

type ProcedureScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Procedure'
>;

type Props = {
  route: ProcedureScreenRouteProp;
};

export const Procedure: FC<Props> = ({ route }) => {
  const { isVerified } = useContext(InitialStateContext);
  const { constituency } = useContext(ConstituencyContext);
  const constituencies = constituency ? [constituency] : [];
  const { data, loading, error } = useQuery<
    ProcedureQueryObj,
    ProcedureVariables
  >(PROCEDURE, {
    variables: {
      id: route.params.procedureId,
      constituencies,
    },
  });
  if (loading) {
    return <ListLoading />;
  }
  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (!data) {
    return <Text>procedure not found</Text>;
  }

  const {
    _id,
    title,
    voteDate,
    voteEnd,
    procedureId,
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

  const share = () => {
    const url = `${getShareLink()}/${type.toLowerCase()}/${procedureId}/${speakingurl(
      title,
    )}`;
    const message = Platform.OS === 'ios' ? title : `${title} – ${url}`;
    Share.share(
      {
        message,
        url,
        title: 'Weil Deine Stimme Zählt!',
      },
      {
        // Android only:
        dialogTitle: title,
      },
    );
  };

  return (
    <Container>
      <Intro {...data.procedure} />
      <Folding title="Details" opened>
        <Details
          subjectGroups={subjectGroups}
          submissionDate={submissionDate}
          dateVote={voteDate}
          abstract={abstract}
          procedureId={procedureId}
          currentStatus={currentStatus}
          type={type}
        />
      </Folding>
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
          <CommunityVoteResults voteResults={communityVotes} />
        )}
      {voteResults && (
        <GovernmentVoteResults
          key="government"
          voteResults={voteResults}
          procedureId={procedureId}
          currentStatus={currentStatus}
        />
      )}
      <PrepareActions
        verified={isVerified}
        type={type}
        voted={voted}
        share={share}
        notify={!!notify}
        procedureId={procedureId}
        procedureObjId={_id}
      />
    </Container>
  );
};
