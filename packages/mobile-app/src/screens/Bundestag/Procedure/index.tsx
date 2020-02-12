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
import Details from './components/Details';
import Documents from './components/Documents';
import { History } from './components/History';
import { CommunityVoteResults } from './components/CommunityVoteResults';
import { GovernmentVoteResults } from './components/GovernmentVoteResults';
import PrepareActions from './PrepareActions';
import { InitialStateContext } from '../../../context/InitialStates';
import { getShareLink } from '../../../lib/shareLink';
import { ConstituencyContext } from '../../../context/Constituency';
import { Centered } from '@democracy-deutschland/mobile-ui/src/components/shared/Centered';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { styled } from '../../../styles';

const Container = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: #fff;
`;

// const HaderRightWrapper = styled.View`
//   flex-direction: row;
//   padding-right: 11;
// `;

type ProcedureScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Procedure'
>;

type ScreenNavigationProp = StackNavigationProp<
  BundestagRootStackParamList,
  'TabView'
>;

type Props = {
  route: ProcedureScreenRouteProp;
  navigation: ScreenNavigationProp;
};

export const Procedure: FC<Props> = ({ route }) => {
  const { isVerified } = useContext(InitialStateContext);
  const { constituency } = useContext(ConstituencyContext);
  const constituencies = constituency ? [constituency] : [];
  const { data, loading, error, refetch } = useQuery<
    ProcedureQueryObj,
    ProcedureVariables
  >(PROCEDURE, {
    variables: {
      id: route.params.procedureId,
      constituencies,
    },
  });

  // TODO Actions oben rechts hinzufügen
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HaderRightWrapper>
  //         <MenuButton onPress={() => navigation.navigate('Filter')}>
  //           <Text>Oh</Text>
  //         </MenuButton>
  //         <MenuButton onPress={() => navigation.navigate('Search')}>
  //           <Text>ho</Text>
  //         </MenuButton>
  //       </HaderRightWrapper>
  //     ),
  //   });
  // }, [navigation]);

  if (loading) {
    return <ListLoading />;
  }
  if (error || !data) {
    return (
      <Centered>
        <Text>Verbindungsfehler</Text>
        <Button
          onPress={() =>
            refetch({
              id: route.params.procedureId,
              constituencies,
            })
          }
          text="Nochmal versuchen"
          textColor="blue"
          backgroundColor="transparent"
        />
      </Centered>
    );
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
